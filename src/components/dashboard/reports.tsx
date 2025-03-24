"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Reports() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Nutritional Reports</h2>
      <p className="text-sm text-gray-500">View and download detailed reports of your feed analyses.</p>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This feature is under development</CardDescription>
        </CardHeader>
        <CardContent>
          <p>The reports section will allow you to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>View historical feed analysis data</li>
            <li>Track nutritional trends over time</li>
            <li>Generate PDF reports for your records</li>
            <li>Compare different feed compositions</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Notify Me When Available</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

