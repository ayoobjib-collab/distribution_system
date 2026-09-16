import { useEffect, useState } from 'react';
import { router, useForm, usePage } from "@inertiajs/react";
import { toast } from 'react-toastify';

import Button from "@/BaseComponents/Button";
import AsyncSelect from "react-select/async";
import ModalAddItem from "./Components/ModalAddItem";
import CustomerData from './Components/CustomerData';
import ItemsTable from './Components/ItemsTable';

import DashboardLayout from "@/Layouts/Dashboard/Layout"
import ModalAddPayMethod from './Components/ModalAddPayMethod';

import { MdSave } from "react-icons/md";
import { SiDatabricks } from "react-icons/si";


/**
 * Invoice create and update
 */
function InvoiceCreate({ invoice, h1 }) {

	const { msg } = usePage().props;

	const isCreateMode = invoice == undefined;

	//States
	const [items, setItems] = useState(invoice?.items ?? []);

	const defualtData = {
		type: '',
		account_id: invoice?.account.id ?? '',
		account_name: invoice?.account.name ?? '',
		subtotal: invoice?.subtotal ?? '',
		pay_method: '',
		items: []
	};
	const { data, setData, processing, post, put, errors } = useForm(defualtData);

	useEffect(() => {
		if (msg.status)
			toast.success(msg.text);
		else
			toast.error(msg.text);
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

		if (!data.items.length) {
			toast.error('فاکتور هیچ محصولی ندارد');
			return;
		}

		if (data.account_id == '') {
			toast.error('یک طرف حساب انتخاب کنید');
			return;
		}

		if (isCreateMode) {

			post('/invoice', {
				preserveScroll: true,
				onSuccess: () => {
					setData(defualtData);
					setItems([]);
				}
			});
		} else {

			if (invoice.status !== 'draft') {
				toast.error('این فاکتور کامل شده و قابل ویرایش نیست');
				return;
			}

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

			<div className="flex flex-col gap2" style={{ marginBottom: 5 }}>
				<h3>
					<SiDatabricks size={24} />
					<span className="ml-2">
						اطلاعات فاکتور
					</span>
				</h3>
			</div >

			<section className='invoice-customer flex flex-col gap-8'>
				{
					isCreateMode ?

						<div className="form-group ic-search-wrap" style={{ marginBottom: "0" }}>
							<AsyncSelect
								classNamePrefix="react-select"
								defaultOptions={false}
								loadOptions={getCustomers}
								onChange={addCustomer}
								placeholder="انتخاب فروشگاه"
								noOptionsMessage={() => "موردی یافت نشد"}
								cacheOptions
								required
							/>
						</div>

						:

						<CustomerData
							customer_name={invoice.account.name}
							customer_number={invoice.account.mobile}
							userFullName={invoice.user.full_name}
						/>
				}
			</section>

			<div className="flex flex-col gap2" style={{ marginBottom: 5 }}>
				<h3>
					<SiDatabricks size={24} />
					<span className="ml-2">
						اقلام فاکتور
					</span>
				</h3>
			</div >

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

			<ModalAddPayMethod
				pay_method={data.pay_method}
				childChanged={(e) => setData('pay_method', e.target.value) }
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
					همه فاکتورها
				</button>
			</div>

		</>
	)
}

InvoiceCreate.layout = page => <DashboardLayout children={page} h1={page.props.h1} />
export default InvoiceCreate;