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

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Editor />
        </div>
      </main>
    </div>
  )
}

export default Home
