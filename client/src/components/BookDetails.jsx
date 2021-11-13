import React from "react";
import { Box, Typography, Button, IconButton, Grid, useMediaQuery } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useGetBook } from "../queries";

export const BookDetails = ({ id, setOpen }) => {
  const { data } = useGetBook(id);
  const matches = useMediaQuery("(min-width:700px)");

  return (
    <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box
        sx={{
          bgcolor: "#eee",
          p: 2,
          width: {
            xs: "90%",
            md: "initial",
          },
          borderRadius: 4,
        }}
      >
        {!data ? (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: { xs: 2, md: 4 } }}>
            <Typography sx={{ flexGrow: 1 }} variant={matches ? "h3" : "h5"}>
              Loading..
            </Typography>
            <IconButton onClick={() => setOpen({ state: false, id: null })}>
              <Close />
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: { xs: 2, md: 4 } }}>
              <Typography sx={{ flexGrow: 1 }} variant={matches ? "h3" : "h5"}>
                {data.book.name}
              </Typography>
              <IconButton onClick={() => setOpen({ state: false, id: null })}>
                <Close />
              </IconButton>
            </Box>
            <Typography variant={matches ? "h6" : "body2"} color="text.secondary">
              {data.book.genre}
            </Typography>
            <Box sx={{ height: "250px", my: 2 }}>
              <img style={{ objectFit: "contain", height: "100%" }} src={data.book.img} alt={data.book.name} />
            </Box>
            <Typography variant={matches ? "h5" : "h6"} sx={{ mt: 4 }}>
              Written by{" "}
              <em>
                {data.book.author.name}, {data.book.author.age}
              </em>
            </Typography>
            <Typography variant={matches ? "h6" : "body2"} sx={{ mt: 1 }}>
              All books by this author
            </Typography>
            <Grid alignItems="start" justifyContent="start" container spacing={1} sx={{ mt: 1, pl: 2, mr: 2 }}>
              {data.book.author.books.map((item) => (
                <Grid item md={6} key={item.id}>
                  <Button
                    fullWidth
                    onClick={() => setOpen({ state: true, id: item.id })}
                    variant="outlined"
                    color="primary"
                    size={matches ? "medium" : "small"}
                    sx={{ borderRadius: "24px", textTransform: "capitalize" }}
                  >
                    {item.name}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
};
