import React, { useEffect, useState } from 'react'

const MovieList = () => {
    const [Movie, setMovie] = useState('')
    const [Movies, setMovies] = useState([])
    const [edit, setEdit] = useState(null)

    useEffect(() => {
        const storedMovie = JSON.parse(localStorage.getItem('movies')) || []
        setMovies(storedMovie)
    }, [])

    const addMovie = (e) => {
        e.preventDefault();

        if (!Movie.trim()) return alert('Please enter the movie name');
        const updatedMovie = edit !== null
            ? Movies.map((m, i) => i === edit ? Movie.trim() : m)
            : [...Movies, Movie.trim()];

        localStorage.setItem("movies", JSON.stringify(updatedMovie))
        setMovies(updatedMovie)
        setMovie("")
        setEdit(null)
        alert('Movie stored in localStorage')
    }

    const editMovie = (i) => {
        setMovie(Movies[i])
        setEdit(i)
    }

    const deleteMovie = (i) => {
        const updatedList = Movies.filter((index) => index !== i)
        localStorage.setItem("movies", JSON.stringify(updatedList))
        setMovies(updatedList)
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-tr from-blue-400 to-cyan-800 transition-all duration-700'>
            <div className='bg-gradient-to-tr from-cyan-800 to-blue-500 shadow-lg rounded-xl p-6 w-full max-w-lg'>
                <h2 className='text-2xl font-bold text-center text-gray-100 mb-4'>Movie Watchlist - Jay Gajjar</h2>

                {/* Input Field */}
                <div className='space-y-4'>
                    <input
                        type="text"
                        placeholder='Enter The Movie Name'
                        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
                        value={Movie}
                        onChange={(e) => setMovie(e.target.value)}
                    />
                    <button
                        className='w-full bg-gradient-to-bl from-sky-800 to-cyan-600 hover:bg-gradient-to-tr hover:from-sky-500 hover:to-cyan-800 text-white font-semibold py-3 rounded-lg transition transform duration-800'
                        onClick={addMovie}
                    >
                        {edit !== null ? "Edit Movie" : "Add Movie"}
                    </button>
                </div>

                <div className='mt-6 space-y-3'>
                    {Movies.length === 0 ? (
                        <p className='text-gray-300 text-center'>No Movies Added Yet...</p>
                    ) : (
                        Movies.map((m, i) => (
                            <div key={i} className='shadow-md shadow-blue-800 p-3 rounded-lg flex items-center justify-between'>
                                <p className='text-gray-50 text-xl'>{m}</p>
                                <div>
                                    <button
                                        className='bg-gradient-to-br from-cyan-800 to-blue-500 hover:bg-gradient-to-tr hover:from-cyan-500 hover:to-blue-800 text-white py-2 px-4 mx-2 rounded-xl transition transform duration-500'
                                        onClick={() => editMovie(i)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className='bg-gradient-to-br from-rose-800 to-red-400 hover:bg-gradient-to-tr hover:from-rose-500 hover:to-red-800 text-white py-2 px-4 mx-2 rounded-xl transition transform duration-500'
                                        onClick={() => deleteMovie(i)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default MovieList