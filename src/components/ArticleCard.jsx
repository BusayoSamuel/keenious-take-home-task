import React from "react";
import { Card, CardContent, Typography, Icon, Box, Link } from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const ArticleCard = ({ article, darkMode }) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        position: "relative",
        boxShadow: "none",
        border: "1px solid #e0e0e0",
        borderRadius: 2,
      }}
    >
      {/* Article type and open access indicator */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 12,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Icon
          sx={{
            color: "#6130ff",
            backgroundColor: darkMode ? "#1f1f1f" : "white",
            borderRadius: "0px",
            padding: "0px",
            marginRight: "4px",
          }}
        >
          <ArticleOutlinedIcon />
        </Icon>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            textTransform: "capitalize",
          }}
        >
          {article.type}
        </Typography>
        {/* Open access lock icon */}
        {article.isOpenAccess ? (
          <LockOpenOutlinedIcon
            sx={{
              color: "#6130ff",
              fontSize: "1rem",
              marginLeft: "4px",
            }}
          />
        ) : (
          <LockOutlinedIcon
            sx={{
              color: "#6130ff",
              fontSize: "1rem",
              marginLeft: "4px",
            }}
          />
        )}
      </div>
      <CardContent
        sx={{
          flex: "1 0 auto",
          paddingTop: 4,
          paddingLeft: 0,
          paddingRight: 2,
          paddingBottom: "0px !important",
          textAlign: "left",
          width: "100%",
        }}
      >
        {/* Article title with link to DOI */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            wordBreak: "break-word",
            hyphens: "auto",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            color: "#6130ff",
            lineHeight: 1.2,
          }}
        >
          <Link
            href={article.doi ? `https://doi.org/${article.doi}` : null}
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            underline="hover"
          >
            {article.title}
          </Link>
        </Typography>
        {/* Publication year and source */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 0, marginBottom: 1 }}
        >
          <Box component="span" sx={{ fontWeight: "bold" }}>
            {article.year}
          </Box>{" "}
          {article.source}
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 1,
          }}
        >
          {/* Authors */}
          <Typography variant="body2" color="text.secondary">
            {article.authors}
          </Typography>
          {/* Citation count */}
          <Typography variant="body2" sx={{ marginBottom: 0 }}>
            {article.citedByCount} Citations
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
