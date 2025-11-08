// Test script

import { db } from "$lib/server/db"
import { processes } from "$lib/server/db/schema"


async function main() {
  let results = await db.select().from(processes)

  console.log(results)
}


await main()
