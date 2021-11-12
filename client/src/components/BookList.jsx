import { Box, Typography, Card, CardContent, CardActions, Button, Grid, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useGetBooks, useDeleteBook } from "../queries";

export const BookList = ({ setId, setOpen }) => {
  const { data } = useGetBooks();
  const [deleteBook] = useDeleteBook();

  return (
    <Box>
      <Grid spacing={2} container>
        {data?.books.map((book) => (
          <Grid item md={4} key={book.id}>
            <Card sx={{ p: 2, borderRadius: 3 }} variant="outlined">
              <CardContent>
                <Typography variant="h6">{book.name}</Typography>
                <Typography color="text.secondary">{book.genre}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  sx={{ borderRadius: "25px", textTransform: "capitalize" }}
                  color="primary"
                  variant="outlined"
                  onClick={() => setOpen({ state: true, id: book.id })}
                >
                  Show details
                </Button>
                <IconButton onClick={() => setId(book.id)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => deleteBook({ variables: { id: book.id } })}>
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
