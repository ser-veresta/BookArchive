import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Grid, CssBaseline, createTheme, ThemeProvider, Modal, Backdrop } from "@mui/material";
import { AddBook } from "./components/AddBook";
import { BookList } from "./components/BookList";
import { BookDetails } from "./components/BookDetails";
import { useState } from "react";

const client = new ApolloClient({
  uri: "https://book-archive-99.herokuapp.com/graphql",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const theme = createTheme({
  palette: {
    primary: {
      light: "#ad1457",
      main: "#880e4f",
    },
    secondary: {
      main: "#eee",
    },
  },
});

export const App = () => {
  const [open, setOpen] = useState({ state: false, id: null });
  const [id, setId] = useState(null);
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Grid sx={{ p: 5 }} spacing={4} container>
          <Grid item xs={12} md={8}>
            <BookList setId={setId} setOpen={setOpen} />
          </Grid>
          <Grid item xs={12} md={4}>
            <AddBook id={id} setId={setId} />
          </Grid>
        </Grid>
        <Modal open={open.state} onClose={() => setOpen({ state: false, id: null })} backdrop={Backdrop}>
          <BookDetails id={open.id} setOpen={setOpen} />
        </Modal>
      </ThemeProvider>
    </ApolloProvider>
  );
};
