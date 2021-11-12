import { useMutation, useQuery, gql } from "@apollo/client";

const GET_BOOKS = gql`
  query getBooks {
    books {
      id
      name
      genre
    }
  }
`;

const GET_AUTHORS = gql`
  query getAuthors {
    authors {
      id
      name
      age
    }
  }
`;

const ADD_BOOK = gql`
  mutation addBook($name: String!, $genre: String!, $img: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, img: $img, authorId: $authorId) {
      id
      name
      genre
    }
  }
`;

const EDIT_BOOK = gql`
  mutation editBook($id: ID!, $name: String!, $genre: String!, $img: String!) {
    editBook(id: $id, name: $name, genre: $genre, img: $img) {
      id
      name
      genre
    }
  }
`;

const DELETE_BOOK = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
      name
      genre
    }
  }
`;

const GET_BOOK = gql`
  query getBook($id: ID!) {
    book(id: $id) {
      id
      name
      img
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export const useGetBooks = () => useQuery(GET_BOOKS);

export const useGetBook = (id) =>
  useQuery(GET_BOOK, {
    variables: { id },
  });

export const useGetAuthors = () => useQuery(GET_AUTHORS);

export const useAddBook = () =>
  useMutation(ADD_BOOK, {
    refetchQueries: [GET_BOOKS],
    onError: (error) => console.log(error.response),
  });

export const useDeleteBook = () =>
  useMutation(DELETE_BOOK, {
    refetchQueries: [GET_BOOKS],
    onError: (error) => console.log(error.response),
  });

export const useEditBook = () =>
  useMutation(EDIT_BOOK, {
    refetchQueries: [GET_BOOKS],
    onError: (error) => console.log(error.message),
  });
