import { useEffect, useState } from "react";

export default function LastSalesPage() {
	const [sales, setSales] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch("https://nextjs-course-190f0-default-rtdb.firebaseio.com/sales.json")
			.then((response) => response.json())
			.then((data) => {
				const transformedSales = [];

				for (const key in data) {
					transformedSales.push({
						id: key,
						username: data[key].username,
						volume: data[key].volume,
					});
				}

				setSales(transformedSales);
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return <p>...Loading</p>;
	}

	if (!sales) {
		return <p>No data yet</p>;
	}

	return (
		<ul>
			{sales.map((sale) => {
				return (
					<li key={sale.id}>
						{sale.username} - ${sale.volume}
					</li>
				);
			})}
		</ul>
	);
}
