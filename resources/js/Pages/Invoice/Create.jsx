import { useEffect, useState } from 'react';
import { router, useForm } from "@inertiajs/react";
import { toast } from 'react-toastify';

import DashboardLayout from "@/Layouts/Dashboard/Layout"

import Button from "@/BaseComponents/Button";
import AsyncSelect from "react-select/async";
import ModalAddItem from "./Components/ModalAddItem";
import CustomerData from './Components/CustomerData';
import ItemsTable from './Components/ItemsTable';
import TransactionShowEdit from './Components/TransactionShowEdit';

import { MdSave } from "react-icons/md";
import { SiDatabricks } from "react-icons/si";
import useInvoiceItems from './Hooks/useInvoiceItems';

import '@/../css/page/invoice-create.css';


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

/**
 * Invoice create and update
 */
function InvoiceCreate({ invoice, h1 }) {


	const isCreateMode = invoice == undefined;

	const defualtData = {
		type: '',
		account_id: invoice?.account.id ?? '',
		account_name: invoice?.account.name ?? '',
		subtotal: invoice?.subtotal ?? '',
		pay_method: '',
		items: [],
		transactions: invoice?.transactions ?? []
	};

	//Hooks
	const {
		items,
		setItems,
		removeItem,
		updateItem,
		calcSubtotal
	} = useInvoiceItems(invoice?.items ?? []);

	const { data, setData, processing, post, put, errors } = useForm(defualtData);

	useEffect(() => {
		if (errors && Object.keys(errors).length > 0) {
			Object.values(errors)
				.flat()
				.forEach((er) => toast.error(er));
		}
	}, [errors]);

	useEffect(() => {
		setData(prev => {
			//Prevent rerender
			if (prev.items === items) return prev;

			return {
				...prev,
				items,
				subtotal: calcSubtotal
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

	return (
		<>
			<div className="flex flex-col gap2" style={{ marginBottom: 5 }}>
				<h3>
					<SiDatabricks size={24} />
					<span className="ml-2">
						طرف فاکتور
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

			<TransactionShowEdit
				dataTransactions={data.transactions}
				setData={setData}
			/>

			{
				data.account_id && items.length > 0 &&
				<div className="ii-form-wrap flex mob-fix">
					<form onSubmit={handleSubmit}>
						<Button
							isLoading={processing}
							text="ذخیره فاکتور"
						/>
					</form>

					< button
						className='secondary'
						onClick={() => router.get('/list')}
					>
						<MdSave />
						لیست محصولات
					</button>
				</div >
			}

		</>
	)
}

InvoiceCreate.layout = page => <DashboardLayout children={page} h1={page.props.h1} />
export default InvoiceCreate;