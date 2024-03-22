import { ChangeEventHandler, useState, useEffect } from 'react';

type Profile = {
    id: number;
    username: string;
};

export default function Search(){
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResults] = useState<Profile[]>([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try{
                const response = await fetch('/api/search?name=${searchTerm}');
                const data = await response.json();
                setSearchResults(data);
            } catch(error){
                console.error('Error fetching search results:', error);
            }
        };
        
        if(searchTerm.trim() !== ''){
            fetchSearchResults();
        } else{
            setSearchResults([]);
        }
    }, [searchTerm]);

    const handleSearchChange = (event: ChangeEventHandler<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Enter username to search"
            />
            <ul>
                {searchResult.map((profile) => (
                    <li key={profile.id}>
                        {profile.username}
                    </li>
                ))}
            </ul>
        </div>
    )
};