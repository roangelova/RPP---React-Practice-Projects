import Counter from "../_components/Counter";

export default async function Page() {

    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    console.log(data) // -> this will not appear in our browser's terminal, but in our terminal!

    return (
        <div>
            <h1>Cabins page</h1>
            <ul>
                {data.map(x => <li key={x.id}>{x.name}</li>)}
            </ul>
            <Counter data={data}/>
        </div>
    );
}
