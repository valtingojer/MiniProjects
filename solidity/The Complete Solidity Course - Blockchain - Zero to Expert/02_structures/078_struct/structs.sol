pragma solidity >= 0.7.0 < 0.9.0;


contract structs{

    struct Movie{
        string title;
        string director;
        uint movie_id;
    }


    Movie public movie;
    Movie[] movies;

    function SetMovie(string memory t, string memory d, uint id) public{

        movie = Movie(t, d, id);
        movies.push(movie);
    }

    function GetAllMovies() public view returns(Movie[] memory){
        return movies;
    }

}