function ListView(props) {
    return (
        <div style={{ width: "90%" }}>
            {props.itemList.map(({ id, name }) => (
                <div key={id}>
                    {name}
                </div>
            ))}
        </div>
    );
}

export default ListView;