'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { Checkbox, Divider, Grid, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface Park {
  area: string;
  dateCreated: string;
  location: string;
  name: string;
  numVisitors: string;
  websiteLink: string;
}

export default function Home() {
  const [parks, setParks] = useState<Park[]>([])
  useEffect(() => {
    fetch('/national-park-passport/national_parks.json')
      .then(response => response.json())
      .then(json => {
        setParks(json);
      });
  }, []);
  console.log(parks)

  const [visitedList, setVisitedList] = useState<number[]>([])
  const [toVisitList, setToVisitList] = useState<number[]>([])

  const onChangeCheckboxToVisit = (index: number) => {
    if (toVisitList.includes(index)) {
      setToVisitList(toVisitList.filter((i) => i !== index))
    } else {
      setToVisitList([...toVisitList, index])
    }
  }

  const onChangeCheckboxVisited = (index: number) => {
    if (visitedList.includes(index)) {
      setVisitedList(visitedList.filter((i) => i !== index))
    } else {
      setVisitedList([...visitedList, index])
    }
  }

  return (
    <>
      <Grid size={12} sx={{ backgroundColor: '	#C56C39', padding: 8 }}>
        <h1 style={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '50px' }}>National Park Passport</h1>
      </Grid>
      <Divider sx={{ height: 30, backgroundColor: '#99542C' }} />
      <Grid container size={12} sx={{ backgroundColor: '	#2D4B1E', textAlign: 'center', color: "white", justifyContent: 'center', padding: "20px" }}>
        <Grid container spacing={2} size={6} sx={{ backgroundColor: 'white important!', border: '1px white', height: '900px', overflow: 'scroll' }}>
          <Grid size={12}>
            <h1 style={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '30px' }}>All National Parks</h1>
          </Grid>
          {parks.map((park: Park, index: number) => (
            <Grid container size={12} key={park.name} sx={{ borderBottom: "1px white" }}>
              <Grid size={3}>
                <Typography>To visit: <Checkbox onChange={() => onChangeCheckboxToVisit(index)}></Checkbox></Typography>
                <Typography>Visited: <Checkbox onChange={() => onChangeCheckboxVisited(index)}></Checkbox></Typography>
              </Grid>
              <Grid size="grow">
                <Typography sx={{ fontSize: '20px' }}><strong>{park.name}</strong> | {park.location}</Typography>
                <Typography>{park.numVisitors} Visitors</Typography>
                <Typography>Established: {park.dateCreated}</Typography>
                <Typography>Area: {park.area}</Typography>
                <Link href={park.websiteLink}>{park.websiteLink}</Link>
              </Grid>
              <Grid size={3}>
                <Image
                  className={styles.logo}
                  src={`/national-park-passport/park/${park.name.toLowerCase()}.jpg`}
                  alt={`Photo of ${park.name} National Park`}
                  width={180}
                  height={180}
                  priority
                />
              </Grid>
            </Grid>))}
        </Grid>
        <Grid size={6}>
          <Grid sx={{ height: '250px', overflow: 'auto' }}>
            <h1 style={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '30px' }}>To Visit</h1>
            {toVisitList.map((toVisitIndex: number) => (
              <Typography key={`to-visit-${toVisitIndex}`}>{parks.at(toVisitIndex)?.name}</Typography>
            ))}
          </Grid>
          <Grid sx={{ height: '250px', overflow: 'auto' }}>
            <h1 style={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '30px' }}>Visited</h1>
            {visitedList.map((visitedIndex: number) => (
              <Typography key={`visited-${visitedIndex}`}>{parks.at(visitedIndex)?.name}</Typography>
            ))}
          </Grid>

        </Grid>
      </Grid>
    </>
  );
}
