import "./search-bar.css";
import { useState, useEffect } from "react";
import Cards from "./companycards";
import { IBusines } from "../types/IBusiness";


function Searchbar() {
    const [business, setBusiness] = useState<IBusines[] | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearched, setIsSearched] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);


    useEffect(() => {
        if (searchTerm === "") {
            setBusiness([]);
            setIsSearched(false);
            setSelectedCompany(null);
        }
    }, [searchTerm]);

    const fetchBusiness = async (e: any) => {
        const url = `https://truspilote-clone.vercel.app/api/search/${e}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setBusiness(data.results);
            console.log(data.results);
        } catch (error) {
            console.log(error);
        }
    };


    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value.length >= 1) {
            fetchBusiness(event.target.value);
        } else {
            setBusiness([]);
        }
    };

    const handleSearchClick = () => {
        setIsSearched(true);
        if (searchTerm.length >= 1) {
            fetchBusiness(searchTerm);
        } else {
            setBusiness([]);
        }
    };


    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearchClick();
        }
    };

    const handleSelectChange = (item: any) => {
        setSelectedCompany(item);
        setSearchTerm(item.name);
    };

    return (
        <>
            <div className="titre-barre">
                <div className="cont">
                    <img src="../recherche.png" className="ImgHome" alt="people searching for reviews, advices" />
                </div>
                <h1>Make the best choice</h1>
                <p>Make a search, we'll take care of the rest</p>
                <div className="search-container">
                    <img src="loupe.png" className="search-icon" />
                    <input
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        value={searchTerm}
                        type="text"
                        placeholder="Look for a category, a company..."
                    />

                    <button onClick={handleSearchClick} className="search-button"> Search </button>
                </div>
                {searchTerm.length > 0 && !isSearched && !selectedCompany && (
                    <div className="dropdown-container">
                        <ul className="dropdown-list">
                            {business && business?.map((item) => (
                                <li className="dropdown-item" key={item.id} onClick={() => handleSelectChange(item)}>
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>


            <div className="result flex flex-col items-center">
                {isSearched && searchTerm && business && business.length === 0 && (
                    <p>No results found</p>
                )}

                {selectedCompany && (
                    <Cards business={selectedCompany} />
                )}

                {isSearched && !selectedCompany && business && business.length > 0 && (
                    business.map((item) => (
                        <Cards key={item.id} business={item} />
                    ))
                )}
            </div>
        </>
    );
}

export default Searchbar;
