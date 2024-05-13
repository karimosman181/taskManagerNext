import Board from "../components/board/board";
import BoardContainer from "../components/board/boardcontainer";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function Dashboard() {
  return (
    <>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start pl-14 gap-x-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="calendar">Calender</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Make changes to your account here.</TabsContent>
        <TabsContent value="board" ><BoardContainer></BoardContainer></TabsContent>
        <TabsContent value="list">Change your password here.</TabsContent>
        <TabsContent value="calendar">Change your password here.</TabsContent>
      </Tabs>
    </>
  );
}
