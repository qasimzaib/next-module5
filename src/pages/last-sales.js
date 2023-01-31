import { useEffect, useState } from "react";
import useSWR from "swr";

export default function LastSalesPage() {
	const [sales, setSales] = useState();
	// const [isLoading, setIsLoading] = useState(false);
	const fetcher = (url) => fetch(url).then((res) => res.json());

	const { data, error } = useSWR(
		"https://nextjs-course-190f0-default-rtdb.firebaseio.com/sales.json",
		fetcher
	);

	useEffect(() => {
		console.log(data);
		if (data) {
			const transformedSales = [];

			for (const key in data) {
				transformedSales.push({
					id: key,
					username: data[key].username,
					volume: data[key].volume,
				});
			}
			console.log(transformedSales);

			setSales(transformedSales);
		}
	}, [data]);

	// useEffect(() => {
	// 	setIsLoading(true);

	// 	fetch("https://nextjs-course-190f0-default-rtdb.firebaseio.com/sales.json")
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			const transformedSales = [];

	// 			for (const key in data) {
	// 				transformedSales.push({
	// 					id: key,
	// 					username: data[key].username,
	// 					volume: data[key].volume,
	// 				});
	// 			}

	// 			setSales(transformedSales);
	// 			setIsLoading(false);
	// 		});
	// }, []);

	if (error) {
		return <p>Failed to load</p>;
	}

	if (!data || !sales) {
		return <p>...Loading</p>;
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
