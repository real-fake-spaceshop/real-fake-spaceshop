import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const ProductsTable = ({products}) => {
	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>Item</TableCell>
					<TableCell>Quantity</TableCell>
					<TableCell>Price</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{products &&
					products.map(product => (
						<TableRow key={product.id}>
							<TableCell>{product.name}</TableCell>
							<TableCell>{product.order_line_item.quantity}</TableCell>
							<TableCell>
								${(
									product.price *
									product.order_line_item.quantity /
									100
								).toFixed(2)}
							</TableCell>
						</TableRow>
					))}
				<TableRow>
					<TableCell rowSpan={1} />
					<TableCell>Total</TableCell>
					<TableCell>
						${products &&
							(
								products.reduce(
									(acc, product) =>
										acc + product.price * product.order_line_item.quantity,
									0
								) / 100
							).toFixed(2)}
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
};

export default ProductsTable;
