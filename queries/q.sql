
-- کوپری ها داخل دیتا بیس  قرار دارند
-- //کتاب های منتشر شده در سال 2019 که توسط قیمت سورت شده اند
SELECT b.title, a.name AS author_name, b.price, b.published_date
FROM public."Books" b
JOIN public."Authors" a ON b.author_id = a.id
WHERE EXTRACT(YEAR FROM b.published_date) = 2019
ORDER BY b.price DESC;

-- //متوسط قیمت کتاب های منتشر شده در هر کشور
SELECT a.country, AVG(b.price) AS average_price
FROM public."Authors" a
JOIN public."Books" b ON a.id = b.author_id
GROUP BY a.country;

-- //نویسنده با بیش از 5 کتاب منتشر شده
SELECT a.name, COUNT(b.id) AS "book_count"
FROM public."Authors" a
JOIN public."Books" b ON a.id = b.author_id
GROUP BY a.name
HAVING COUNT(b.id) > 5;

