import { useEffect, useState } from 'react';

import { router, useForm, usePage } from "@inertiajs/react";
import { toast } from 'react-toastify';

import Button from "@/BaseComponents/Button";

import AsyncSelect from "react-select/async";
import ModalAddItem from "./Components/ModalAddItem";
import CustomerData from './Components/CustomerData';
import InvoiceHead from './Components/InvoiceHead';
import ItemsTable from './Components/ItemsTable';

import FormField from "@/BaseComponents/FormField";

import { MdSave } from "react-icons/md";
import DashboardLayout from "@/Layouts/Dashboard/Layout"


/**
 * Invoice create and update
 */
function InvoiceCreate({ invoice }) {

	const { msg } = usePage().props;


	//States
	const [items, setItems] = useState(invoice?.items ?? []);
	const [isSettled, setIsSettled] = useState(false);

	const defualtData = {
		type: '',
		account_id: invoice?.account.id ?? '',
		account_name: invoice?.account.name ?? '',
		subtotal: invoice?.subtotal ?? '',
		items: []
	};
	const { data, setData, processing, post, put, errors } = useForm(defualtData);

	useEffect(() => {
		if (msg)
			toast.success(msg);
	}, [msg]);

	useEffect(() => {
		if (errors && Object.keys(errors).length > 0) {
			Object.values(errors)
				.flat()
				.forEach((er) => toast.error(er));
		}
	}, [errors]);

	useEffect(() => {

		const calculatedsubtotal = items.reduce((acc, item) => {

			const qty = Number(item.quantity) || 0;
			const price = item.unit_price * (1 - (item.discount / 100));

			return acc + (qty * price);
		}, 0);


		setData(prev => {

			//Prevent re render
			if (prev.items === items) return prev;

			return {
				...prev,
				items,
				subtotal: calculatedsubtotal
			};
		});

	}, [items]);

	const handleSubmit = (e) => {

		e.preventDefault();

		if (invoice == undefined) {

			post('/invoice', {
				preserveScroll: true,
				onSuccess: () => {
					setData(defualtData);
					setItems([]);
				}
			});
		} else {

			put(`/invoice/${invoice.id}`, {
				preserveScroll: true,
				onSuccess: () => {
					setData(defualtData);
				}
			});
		}

	};

	const getCustomers = async (inputValue) => {
		if (!inputValue) return [];

		const res = await fetch(
			`/api/v1/accounts?search=${encodeURIComponent(inputValue)}`
		);

		const data = await res.json();

		return data.map(customer => ({
			value: customer.id,
			label: customer.name,
		}));
	};

	function addCustomer(selectObject) {

		let val = selectObject?.value;

		setData(prev => {
			return {
				...prev,
				account_id: val,
				account_name: selectObject.label, //label is name
			};
		});
	}

	//Remove invoice items
	function removeItem(itemId) {
		setItems(prev => {
			let newItems = [...prev];
			return newItems.filter(i => i.id !== itemId);
		});
	}


	//Update invoice item
	function updateItem(id, key, value) {

		setItems(prev =>
			prev.map(item =>
				item.id === id
					? { ...item, [key]: value }
					: item
			)
		);
	}

	return (
		<>

			<section className='invoice-customer flex flex-col gap-8'>
				<div className="flex flex-col gap-4 ic-search-wrap">
					<h4>انتخاب مشتری</h4>
					<AsyncSelect
						classNamePrefix="react-select"
						defaultOptions={false}
						loadOptions={getCustomers}
						onChange={addCustomer}
						placeholder="جستجوی مشتری با نام یا شماره ...."
						noOptionsMessage={() => "موردی یافت نشد"}
						cacheOptions
						required
					/>
				</div>
			</section>

			<section className='invoice-items table-container'>

				<ItemsTable
					items={items}
					subtotal={data.subtotal}
					updateItem={updateItem}
					removeItem={removeItem}
				/>

			</section >

			<ModalAddItem
				invoiceType={data.type}
				setItems={setItems}
			/>

			<div className="ii-form-wrap flex mob-fix">
				<form onSubmit={handleSubmit}>
					<Button
						isLoading={processing}
						text="ذخیره فاکتور"
					/>
				</form>

				<button
					className='secondary'
					onClick={() => router.get('/invoice')}
				>
					<MdSave />
					انصراف
				</button>
			</div>

		</>
	)
}

InvoiceCreate.layout = page => <DashboardLayout children={page} h1="ایجاد فاکتور" />
export default InvoiceCreate;