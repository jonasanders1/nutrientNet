import * as React from "react";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Percent, MessageSquare } from "lucide-react";

type BreadcrumbNameMap = { [path: string]: string };

// Customize labels here if needed
const breadcrumbNameMap: BreadcrumbNameMap = {};

export default function RouterBreadcrumbs() {
  const pathname = usePathname();
  const pathnames = React.useMemo(
    () => (pathname || "/").split("/").filter(Boolean),
    [pathname]
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: "hsl(var(--muted-foreground))",
          },
        }}
      >
        <Link
          component={NextLink}
          underline="hover"
          color="inherit"
          href="/"
          sx={{
            color: "hsl(var(--muted-foreground))",
            "&:hover": { color: "hsl(var(--accent))" },
            display: "flex",
            alignItems: "center",
          }}
        >
          <MessageSquare strokeWidth={2} size={"16px"} className="mr-1" />
          Home
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const label =
            breadcrumbNameMap[to] ??
            decodeURIComponent(value.replace(/-/g, " "));

          return isLast ? (
            <Typography
              key={to}
              sx={{
                color: "hsl(var(--foreground))",
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Percent strokeWidth={2} size={"16px"} className="mr-1" />

              {label}
            </Typography>
          ) : (
            <Link
              key={to}
              component={NextLink}
              underline="hover"
              color="inherit"
              href={to}
              sx={{
                color: "hsl(var(--muted-foreground))",
                "&:hover": { color: "hsl(var(--accent))" },
                display: "flex",
                alignItems: "center",
              }}
            >
              {label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
