'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { Button, Divider, Grid, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Papa from 'papaparse';

interface Park {
  area: string;
  dateCreated: string;
  location: string;
  name: string;
  numVisitors: string;
  websiteLink: string;
}

export default function Home() {
  const [parks, setParks] = useState<Park[] | unknown[]>([])
  useEffect(() => {
    fetch('national-park-passport/parks.csv')
      .then(response => response.text())
      .then(csvText => {
        const results = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true
        });
        console.log(results)
        setParks(results.data);
      });
  }, []);
  console.log(parks)
  return (
    <>
      <Grid size={12} sx={{ backgroundColor: '	#C56C39', padding: 8 }}>
        <h1 style={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '50px' }}>National Park Passport</h1>
      </Grid>
      <Divider sx={{ height: 30, backgroundColor: '#99542C' }} />
      <Grid container size={12} sx={{ backgroundColor: '	#2D4B1E', textAlign: 'center', color: "white", alignItems: 'center', justifyContent: 'center' }}>
        <Grid size={6} sx={{ backgroudColor: 'white', borderRight: '1px white' }}>
          {parks.map((park: Park | unknown) => (<Grid key={park.name} sx={{borderRight: '1px white'}}>
            <Typography sx={{ fontSize: '20px' }}>{park.name} | {park.location}</Typography>
            <Typography>{park.numVisitors} Visitors</Typography>
            <Typography>Established: {park.dateCreated}</Typography>
            <Typography>Area: {park.area}</Typography>
            <Link href={park.websiteLink}>{park.websiteLink}</Link>
            <Divider sx={{ height: '1px', backgroundColor: 'white'}} />
          </Grid>))}
        </Grid>
      </Grid>
      <div className={styles.page}>
        NATIONAL PARK PASSPORT
        <Button>
          Search here
        </Button>
        <Typography>hello how are you</Typography>
        <main className={styles.main}>
          <Image
            className={styles.logo}
            src="national-park-passport/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <ol>
            <li>
              Get started by editing <code>src/app/page.tsx</code>.
            </li>
            <li>Save and see your changes instantly.</li>
          </ol>

          <div className={styles.ctas}>
            <a
              className={styles.primary}
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="national-park-passport/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
              Deploy now
            </a>
            <a
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondary}
            >
              Read our docs
            </a>
          </div>
        </main>
        <footer className={styles.footer}>
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="national-park-passport/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="national-park-passport/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="national-park-passport/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
    </>
  );
}
