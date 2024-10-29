// Route handlers

import { createClient } from "jsr:@supabase/supabase-js@2";
const supabase = createClient(
    "https://mhypofwfqwtxejiwflyb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oeXBvZndmcXd0eGVqaXdmbHliIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDExOTUzMiwiZXhwIjoyMDQ1Njk1NTMyfQ.0B4ROAQ5bmaM-t-x0thF6Dcgkv11_djDSW6I_EyErOI",
);
class BookController {
    getBooks = async (req: Request) => {
        try {
            const url = new URL(req.url);
            const {
                sortby_published_date = "asc",
                author_id,
                page = "1",
                pageSize = "10",
            } = Object.fromEntries(url.searchParams);

            // Validate pagination parameters
            const currentPage = Math.max(Number(page), 1);
            const sizePerPage = Math.min(Math.max(Number(pageSize), 1), 100); // Limit pageSize to avoid excessive data

            const offset = (currentPage - 1) * sizePerPage;
            const isAscending = sortby_published_date.toLowerCase() === "asc";
            // Build the query
            let query = supabase
                .from("Books")
                .select("*")
                .order("published_date", { ascending: isAscending })
                .range(offset, offset + sizePerPage - 1);

            // Apply filter if author_id is provided
            if (author_id) {
                query = query.eq("author_id", author_id);
            }

            const { data, error, count } = await query;

            if (error) {
                return new Response(JSON.stringify({ error: error.message }), {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                });
            }

            return new Response(
                JSON.stringify({
                    data,
                    totalCount: count,
                    currentPage,
                    pageSize: sizePerPage,
                }),
                { headers: { "Content-Type": "application/json" } },
            );
        } catch (err) {
            console.error("Error fetching books:", err);
            return new Response(
                JSON.stringify({ error: "Internal Server Error" }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }
    };
}

export default BookController;
