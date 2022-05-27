function AddContact() {
    return (
        <div>
            <textarea name="first_name" />
            <textarea name="last_name" />
            <textarea name="blockchain_id" />
            <div style={{ flexDirection: "row" }}>
                <button name="submit" />
                <button name="cancel" />
            </div>
        </div>
    );
}