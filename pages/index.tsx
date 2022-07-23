import type { NextPage } from 'next'
import Head from 'next/head'
import { Editor } from '../components/Editor'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Lexical Editor</title>
        <meta name="description" content="Learning to `Lexical`." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <Editor />
        </div>
      </main>
    </div>
  )
}

export default Home
