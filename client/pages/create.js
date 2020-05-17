import { useState } from 'react';
import Container from '../components/container';
import Layout from '../components/layout';
import { saveEntry } from '../lib/api';
import Head from 'next/head';

export default function Create() {
    const [contact, setContact] = useState({
        title: '',
        slug: '',
    });

    const handleChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = await saveEntry(contact.title);
    };

    return (
        <>
            <Layout>
                <Head>
                    <title>Create a new entry</title>
                </Head>
                <Container>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Title:</label>
                            <input name='title' type='text' onChange={handleChange} />
                        </div>

                        <button type='submit'>Submit</button>
                    </form>
                </Container>
            </Layout>
        </>
    );
}