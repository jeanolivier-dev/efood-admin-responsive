"use client";

import Link from "next/link";
import { RefObject, useState } from "react";
import { Title, Text, Popover, Avatar, Badge } from "rizzui";
import cn from "@/utils/class-names";
import { PiCheck } from "react-icons/pi";

const data = [
  {
    id: 1,
    message: `It is nice to be chatting with you. Omnis,
        quidem non. Sint inventore quasi temporibus architecto eaque,
        natus aspernatur minus?`,
    avatar: [
      "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-01.webp",
    ],
    name: "Wade Warren",
    unRead: true,
    sendTime: "2023-06-01T09:35:31.820Z",
  },
  {
    id: 2,
    message: ` Oh... Let's move on to something else for a bit. Sint inventore quasi temporibus architecto eaque,
        natus aspernatur minus?`,
    avatar: [
      "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-04.webp",
    ],
    name: "Jane Cooper",
    unRead: true,
    sendTime: "2023-05-30T09:35:31.820Z",
  },
  {
    id: 3,
    message: `You: I never received any phone calls about it. Omnis,
        quidem non. Sint inventore quasi temporibus architecto eaque,
        natus aspernatur minus?`,
    avatar: [
      "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-12.webp",
    ],
    name: "Leslie Alexander",
    unRead: false,
    sendTime: "2023-06-01T09:35:31.820Z",
  },
];

function MessagesList({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="w-[320px] text-left sm:w-[360px] 2xl:w-[420px] rtl:text-right">
      <div className="mb-2 flex items-center justify-between ps-6">
        <Title as="h5">Messages</Title>
        <Link
          href={"#"}
          onClick={() => setIsOpen(false)}
          className="hover:underline"
        >
          Voir tout
        </Link>
      </div>
      <div className="grid grid-cols-1 ps-4">
        {data.map((item) => (
          <div
            key={item.name + item.id}
            className="group grid cursor-pointer grid-cols-[auto_minmax(0,1fr)] gap-2.5 rounded-md px-2 py-2.5 pe-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-50"
          >
            <div className={cn("relative", item.avatar.length > 1 && "me-1")}>
              <Avatar
                src={item.avatar[0]}
                name={item.name}
                className={cn(
                  item.avatar.length > 1 && "relative -end-1 -top-0.5 !h-9 !w-9"
                )}
              />
              {item.avatar.length > 1 && (
                <Avatar
                  src={item.avatar[1]}
                  name={item.name}
                  className="absolute -bottom-1 end-1.5 !h-9 !w-9 border-2 border-gray-0 dark:border-gray-100"
                />
              )}
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
              <div className="w-full">
                <Title as="h6" className="mb-0.5 text-sm font-semibold">
                  {item.name}
                </Title>
                <div className="flex">
                  <Text className="w-10/12 truncate pe-7 text-xs text-gray-500">
                    {item.message}
                  </Text>
                </div>
              </div>
              <div className="ms-auto flex-shrink-0">
                {item.unRead ? (
                  <Badge
                    renderAsDot
                    size="lg"
                    color="primary"
                    className="scale-90"
                  />
                ) : (
                  <span className="inline-block rounded-full bg-gray-100 p-0.5 dark:bg-gray-50">
                    <PiCheck className="h-auto w-[9px]" />
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MessagesDropdown({
  children,
}: {
  children: JSX.Element & { ref?: RefObject<any> };
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement={"bottom"}
    >
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content className="z-[9999] pb-6 pe-6 ps-0 pt-5 dark:bg-gray-100 [&>svg]:hidden sm:[&>svg]:inline-flex [&>svg]:dark:fill-gray-100">
        <MessagesList setIsOpen={setIsOpen} />
      </Popover.Content>
    </Popover>
  );
}
