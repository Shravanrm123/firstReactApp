

function Search({onSearch}){
    
    return(
        <div>
            <label htmlFor="id">Search</label>
            <input type="text" id="search" 
        onChange={onSearch}>
            
        </input>
        </div>
    );
}
export default Search;