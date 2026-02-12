export type Schedule = {
  Today: string;
  Tomorrow: string;
};

const LOE_DOMAIN = "https://api.loe.lviv.ua";

export async function loadSchedule(): Promise<Schedule> {
  const res = await fetch(`${LOE_DOMAIN}/api/menus?page=1&type=photo-grafic`, {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language":
        "en-GB,en;q=0.9,uk-UA;q=0.8,uk;q=0.7,en-US;q=0.6,ru;q=0.5",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Not(A:Brand";v="8", "Chromium";v="144", "Google Chrome";v="144"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      Referer: "https://poweron.loe.lviv.ua",
    },
    method: "GET",
  });

  const data = (await res.json()) as any;

  const schedule: Schedule = {
    Today: "",
    Tomorrow: "",
  };

  if (!data["hydra:member"]) {
    return schedule;
  }

  data["hydra:member"][0].menuItems.forEach((item: any) => {
    schedule[item.name as keyof typeof schedule] = item.slug;
  });

  return schedule;
}

export async function loadScheduleImageBuffer(slug: string): Promise<Buffer> {
  const IMAGE_FETCH_OPTIONS = {
    headers: {
      accept:
        "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      Referer: "https://poweron.loe.lviv.ua/",
    },
    method: "GET" as const,
  };

  const res = await fetch(`${LOE_DOMAIN}/${slug}`, IMAGE_FETCH_OPTIONS);

  const arrayBuffer = await res.arrayBuffer();

  return Buffer.from(arrayBuffer);
}

export async function loadOldSchedule(): Promise<Schedule> {
  const stateFile = Bun.file("state.json");

  if (!(await stateFile.exists())) {
    await Bun.write(stateFile, JSON.stringify({ Today: "", Tomorrow: "" }));

    return { Today: "", Tomorrow: "" };
  }

  const state = await stateFile.json();

  return state;
}

export async function saveNewState(schedule: Schedule) {
  const stateFile = Bun.file("state.json");

  await Bun.write(stateFile, JSON.stringify(schedule));
}
