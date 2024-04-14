export default function Dashboard() {
  return (
    <>
      <div className="relative overflow-hidden max-w-[600px] lg:max-w-none mx-5 mt-4">
        <div className="h-full w-full rounded-[inherit]">
          <div className="table w-full">
            <div className="mb-4 flex items-center gap-2">
              <a
                className="flex h-7 items-center cursor-pointer justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary bg-muted font-medium text-primary"
                // href="/examples/mail"
              >
                Overview
              </a>
              <a
                className="flex h-7 items-center justify-center cursor-pointer rounded-full px-4 text-center text-sm transition-colors hover:text-primary text-muted-foreground"
                // href="/examples/dashboard"
              >
                Board
              </a>
              <a
                className="flex h-7 items-center justify-center rounded-full  cursor-pointer px-4 text-center text-sm transition-colors hover:text-primary text-muted-foreground"
                // href="/examples/cards"
              >
                List
              </a>
              <a
                className="flex h-7 items-center cursor-pointer justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary text-muted-foreground"
                // href="/examples/tasks"
              >
                Calender
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
