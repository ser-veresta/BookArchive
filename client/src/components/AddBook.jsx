import { useAddBook, useGetAuthors, useEditBook, useGetBook } from "../queries";
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export const AddBook = ({ id, setId }) => {
  const { data: authorsData } = useGetAuthors();
  const { data: bookData } = useGetBook(id);
  const [addBook] = useAddBook();
  const [editBook] = useEditBook();
  const [inputs, setInputs] = useState({ name: "", genre: "", img: "", authorId: "" });
  const [err, setErr] = useState("");

  useEffect(() => {
    if (id) {
      const book = bookData?.book;
      book && setInputs({ name: book.name, genre: book.genre, img: book.img, authorId: "" });
    }
  }, [bookData?.book, id]);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErr(null);

    if (!inputs.name) {
      setErr("Enter a name");
      return;
    }

    if (!inputs.genre) {
      setErr("Enter a genre");
      return;
    }

    if (!inputs.img) {
      setErr("Enter a image url");
      return;
    }

    if (!inputs.authorId || !id) {
      setErr("Select an author");
    }

    if (!id) {
      addBook({ variables: inputs });
      setErr(null);
      setInputs({ name: "", genre: "", img: "", authorId: "" });
      setId(null);
    } else {
      editBook({ variables: { ...inputs, id } });
      setErr(null);
      setInputs({ name: "", genre: "", img: "", authorId: "" });
      setId(null);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Paper
        sx={{
          width: {
            xs: "100%",
            md: "80%",
          },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 4,
          alignItems: "center",
        }}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {err && (
          <Box sx={{ bgcolor: "pink", p: 2, borderRadius: 5, width: "100%" }}>
            <Typography>{err}</Typography>
          </Box>
        )}
        <TextField fullWidth variant="filled" label="Name" name="name" value={inputs.name} onChange={handleChange} />
        <TextField fullWidth variant="filled" label="Genre" name="genre" value={inputs.genre} onChange={handleChange} />
        <TextField fullWidth variant="filled" label="ImageUrl" name="img" value={inputs.img} onChange={handleChange} />
        <FormControl disabled={id} variant="filled" fullWidth>
          <InputLabel htmlFor="author" id="authorLabel">
            Author
          </InputLabel>
          <Select
            labelId="authorLabel"
            id="author"
            name="authorId"
            label="Author"
            value={inputs.authorId}
            onChange={handleChange}
          >
            {authorsData?.authors?.map((author) => (
              <MenuItem value={author.id}>{author.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          color="primary"
          sx={{ borderRadius: "25px", textTransform: "capitalize" }}
          variant="outlined"
          type="submit"
          size="large"
        >
          {id ? "Edit" : "+"}
        </Button>
      </Paper>
    </Box>
  );
};
