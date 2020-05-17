import { useState } from 'react';
import Container from '../components/container';
import Layout from '../components/layout';
import { searchEntries, getAllCategories } from '../lib/api';
import Head from 'next/head';
import MoreStories from '../components/more-stories';

export default function Create({ allCategories }) {
    const [search, setSearch] = useState({
        query: '',
        blog: '',
        countries: '',
    });

    const [results, setResults] = useState([]);

    const handleChange = (e) => setSearch({ ...search, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        let variables = { search: content.query };
        let id = [];

        if (search.blog.length > 0) {
            id.push(parseInt(search.blog));
        }

        if (search.countries.length > 0) {
            id.push(parseInt(search.countries));
        }

        if (id.length > 0) {
            variables.id = id;
        }

        const entries = await searchEntries(variables);

        setResults(entries);
    };

    return (
        <>
            <Layout>
                <Head>
                    <title>Search</title>
                </Head>
                <Container>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Search:</label>
                            <input name='query' type='search' onChange={handleChange} />
                        </div>

                        <div>
                            <label>Blog:</label>
                            <select name='blog' onChange={handleChange}>
                                <option value=''>Select item</option>
                                {allCategories.blog.map((data) => (
                                    <option key={data.id} value={data.id}>
                                        {data.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Blog:</label>
                            <select name='blog' onChange={handleChange}>
                                <option value=''>Select item</option>
                                {allCategories.countries.map((data) => (
                                    <option key={data.id} value={data.id}>
                                        {data.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button type='submit'>Search</button>
                    </form>

                    {results.length > 0 && <MoreStories posts={results} />}
                </Container>
            </Layout>
        </>
    );
}

export async function getStaticProps() {
    const allCategories = await getAllCategories();

    return {
        props: { allCategories },
    };
}
