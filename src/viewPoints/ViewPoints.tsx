import Footer from "../components/Footer/Footer.tsx";
import ViewMap from "../components/ViewMap/ViewMap.tsx";
import {useEffect, useState} from "react";
import supabase from "../supabase.ts";
import {PostgrestSingleResponse} from "@supabase/supabase-js";

function ViewPoints() {
  const [longitudeAndLatitudePoints, setLongitudeAndLatitudePoints] = useState<number[][]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (supabase === undefined) {
        console.log("supabase connection not made");
        return;
      }
      setIsLoading(true);
      try {
        const data = await supabase?.from("longitude_and_latitude").select()
        const points = convertDataToArrayOfNumberArrays(data)

        setLongitudeAndLatitudePoints(points);
      } catch (error) {
        console.log(error);
        return;
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  function convertDataToArrayOfNumberArrays(data: PostgrestSingleResponse<any>): number[][] {
    const points: number[][] = [];

    if (data.data === null) {
      console.log("fetched data was empty: ", data);
      return [];
    }

    data.data.forEach((point: { longitude: number; latitude: number; }) => {
      const newPoint: number[] = [point.longitude, point.latitude];
      points.push(newPoint);
    })

    return points;
  }

  return (
    <>
      <h1 className="flex justify-center text-5xl">
        View Points
      </h1>
      {isLoading ? (
        <p className="flex justify-center">Loading...</p>
      ) : longitudeAndLatitudePoints.length > 0 ? (
        <ViewMap longitudeAndLatitudePoints={longitudeAndLatitudePoints} />
      ) : (
        <p className="flex justify-center">No points to display.</p>
      )}
      <Footer/>
    </>
  )
}

export default ViewPoints;