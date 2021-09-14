import './styles.css'

export const TextInput = ({ onChange, Searchvalue }) => {
    return (
        <input className="text-input"
            onChange={onChange}
            value={Searchvalue}
            placeholder="Pesquise aqui..."
            type="search" />
    )
}
