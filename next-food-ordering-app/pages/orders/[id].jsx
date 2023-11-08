import styles from '../../styles/Order.module.css';
import Image from 'next/image';
import axios from 'axios';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

const Order = ({ order }) => {
	const status = order.status;
	const { t, lang } = useTranslation('common');

	const statusClass = (index) => {
		if (index - status < 1) return styles.done;
		if (index - status === 1) return styles.inProgress;
		if (index - status > 1) return styles.undone;
	};

	return (
		<>
			<Head>
				<title>{t('Lahmah&FahmahOrders')}</title>
			</Head>
			<div className={styles.container}>
				<div className={styles.left}>
					<div className={styles.row}>
						<table className={styles.table}>
							<thead className={styles.thead}>
								<tr className={styles.trTitle}>
									<th>Order ID</th>
									<th>Customer</th>
									<th>Address</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody className={styles.tbody}>
								<tr className={styles.tr}>
									<td>
										<span className={styles.id}>{order._id}</span>
									</td>
									<td>
										<span className={styles.name}>
											{order.customer}
										</span>
									</td>
									<td>
										<span className={styles.address}>
											{order.address}
										</span>
									</td>
									<td>
										<span className={styles.total}>
											${order.total}
										</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className={styles.row}>
						<div className={statusClass(0)}>
							<Image
								src='/img/paid.svg'
								width={30}
								height={30}
								alt='Payment'
							/>
							<span>Payment</span>
							<div className={styles.checkedIcon}>
								<Image
									className={styles.checkedIcon}
									src='/img/checked.svg'
									width={20}
									height={20}
									alt='checked'
								/>
							</div>
						</div>
						<div className={statusClass(1)}>
							<Image
								src='/img/bake.svg'
								width={30}
								height={30}
								alt='Preparing'
							/>
							<span>Preparing</span>
							<div className={styles.checkedIcon}>
								<Image
									className={styles.checkedIcon}
									src='/img/checked.svg'
									width={20}
									height={20}
									alt='checked'
								/>
							</div>
						</div>
						<div className={statusClass(2)}>
							<Image
								src='/img/bike.svg'
								width={30}
								height={30}
								alt='On the way'
							/>
							<span>On the way</span>
							<div className={styles.checkedIcon}>
								<Image
									className={styles.checkedIcon}
									src='/img/checked.svg'
									width={20}
									height={20}
									alt='checked'
								/>
							</div>
						</div>
						<div className={statusClass(3)}>
							<Image
								src='/img/delivered.svg'
								width={30}
								height={30}
								alt='Delivered'
							/>
							<span>Delivered</span>
							<div className={styles.checkedIcon}>
								<Image
									className={styles.checkedIcon}
									src='/img/checked.svg'
									width={20}
									height={20}
									alt='checked'
								/>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.wrapper}>
						<h2 className={styles.title}>CART TOTAL</h2>
						<div className={styles.totalText}>
							<b className={styles.totalTextTitle}>Total:</b>$
							{order.total}
						</div>
						<button
							disabled
							className={styles.button}
						>
							PAID
						</button>
					</div>
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = async ({ params }) => {
	const res = await axios.get(
		`${process.env.API_URL}/api/orders/${params.id}`,
	);
	return {
		props: { order: res.data },
	};
};

export default Order;
