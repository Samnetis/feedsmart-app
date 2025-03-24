"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Users() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">User Management</h2>
      <p className="text-sm text-gray-500">Manage user access and permissions.</p>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This feature is under development</CardDescription>
        </CardHeader>
        <CardContent>
          <p>The user management section will allow you to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Add and remove users</li>
            <li>Set user permissions</li>
            <li>Track user activity</li>
            <li>Manage team access</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Notify Me When Available</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

