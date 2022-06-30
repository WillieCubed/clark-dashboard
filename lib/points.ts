import React from "react";
import { supabase } from "./supabase-client";

/**
 * One instance of points being awarded.
 */
export type PointAwardRecord = {
  /**
   * The UID of the person who earned the points for their house.
   */
  awardee: string;

  /**
   * The house that receives the points of the awardee.
   */
  recipientHouse: string;

  /**
   * Can be negative.
   */
  points: number;

  /**
   * When the points were awarded, not necessarily earned.
   */
  timestamp: Date;

  /**
   * A short description of how these points were earned.
   */
  reason: string;
};

const TABLE_NAME_POINT_RECORDS = "point_records";

export async function getPoints(): Promise<PointAwardRecord[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME_POINT_RECORDS)
    .select(`*`);
  // .eq("id", user!.id) // TODO: Fix this code smell
  if (error) {
    console.error(error);
    throw error;
  }
  console.log(data);
  return data;
}

/**
 * Returns the point records for the entire program.
 */
export function usePointRecords() {
  const [pointRecords, setPointRecords] = React.useState<PointAwardRecord[]>(
    []
  );

  React.useEffect(() => {
    getPoints().then((records) => {
      setPointRecords(records);
    });
  }, []);
  return pointRecords;
}
