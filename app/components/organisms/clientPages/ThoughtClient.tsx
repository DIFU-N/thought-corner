"use client";
import { useAppSelector } from "@/app/hooks/dispatch";
import { useRouter } from "next/navigation";
import ThoughtCard from "../../atoms/thoughtCard/thoughtCard";
import Link from "next/link";
import PageTransition from "../animations/PageTransition";
import StackPush from "../../molecules/animations/StackPush";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Group } from "@/app/utils/types/thoughts";
import { getAllGroups } from "@/app/utils/services/api";

const ThoughtClient = () => {
  const { thoughts } = useAppSelector((state) => state.thought);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  // const filteredThoughts = thoughts.filter((single) => single.group === "Tech");

  // const { groups } = useAppSelector((state) => state.groups);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  useEffect(() => {
    const fetchGroups = async () => {
      const data = await getAllGroups();
      setGroups(data);
    };
    fetchGroups();
  }, []);
  console.log("okay", groups);

  const options = groups.map((group) => ({
    value: group.name,
    label: group.name,
  }));

  const filteredThoughts =
    selectedGroups.length === 0
      ? thoughts
      : thoughts.filter((thought) => selectedGroups.includes(thought.group));

  const toMore = () => {
    return router.push("/addthought");
  };
  return (
    <PageTransition>
      <div className="min-h-screen flex justify-center w-full max-w-full bg-white py-5 md:pt-10 px-[10%] md:px-[12%]">
        <div className="w-[90%] lg:w-[70%]">
          <div className="mb-4 flex flex-col gap-1">
            <div className="text-2xl lg:text-6xl font-serif flex gap-1 bg-gray-400 py-5 px-4 rounded-t-md">
              Thought
              <div className="text-4xl lg:text-6xl font-serif text-white">
                Corner
              </div>
            </div>
            <div>
              <StackPush />
            </div>
            <div className="flex justify-between">
              <div>
                {isAuthenticated ? (
                  <button
                    className="border border-black p-2 text-xs"
                    onClick={() => toMore()}
                  >
                    add more +
                  </button>
                ) : null}
                {/* <button onClick={toMore}>add more +</button> */}
              </div>
            </div>
          </div>
          <div className="my-4">
            <Select
              instanceId="group-filter"
              isMulti
              options={options}
              value={options.filter((o) => selectedGroups.includes(o.value))}
              onChange={(selected) =>
                setSelectedGroups(selected.map((option) => option.value))
              }
              placeholder="Filter by group..."
            />
          </div>
          {filteredThoughts
            .slice() // avoid mutating original array
            // .sort((a, b) => b.date.getTime() - a.date.getTime())
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            )
            .map((thought) => (
              // <div key={thought.id}>{thought.title}</div>

              <Link href={`/${thought.id}`} key={thought.id}>
                <ThoughtCard key={thought.id} thought={thought} />
              </Link>
            ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default ThoughtClient;
