
import { SVGProps } from "react";
import { format } from "date-fns";

const timeline = {
  start: new Date("2025-01-12"),
  latest: new Date("2025-02-12"),
  next: new Date("2025-03-12"),
  end: new Date("2025-12-12"),
}

export default function PaymentTermsTimeline() {
  return (
    <div className="relative mb-10">
      <div className="flex justify-between relative z-10">
        <div className="flex flex-col text-sm items-start text-[#7b7b7b]">
          <span className="text-[10px]">
            Term start
          </span>
          <span>{format(timeline.start, "dd.MM.yyyy")}</span>
          <MutedEllipse className="mt-1" />
        </div>
        <div className="flex flex-col text-sm items-center">
          <span className="text-[10px]">
            Latest
          </span>
          <span>{format(timeline.latest, "dd.MM.yyyy")}</span>
          <Ellipse className="mt-1" />
        </div>
        <div className="flex flex-col text-sm items-center">
          <span className="text-[10px]">
            Next
          </span>
          <span>{format(timeline.next, "dd.MM.yyyy")}</span>
          <Ellipse className="mt-1" />
        </div>
        <div className="flex flex-col text-sm items-end text-[#7b7b7b]">
          <span className="text-[10px]">
            Term end
          </span>
          <span>{format(timeline.end, "dd.MM.yyyy")}</span>
          <MutedEllipse className="mt-1" />
        </div>
      </div>

      <div className="flex w-full absolute bottom-1.5">
        <div className="basis-105/300">
          <GradientLine />
        </div>
        <div className="basis-195/300">
          <DottedLine />
        </div>
      </div>
    </div>
  );
}

function Ellipse(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={15}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={8.33398} cy={7.5} r={7.25} fill="#121212" />
      <circle
        cx={8.33398}
        cy={7.5}
        r={7.25}
        fill="url(#paint0_linear_720_6454)"
        fillOpacity={0.77}
      />
      <circle
        cx={8.33398}
        cy={7.5}
        r={7.25}
        fill="url(#paint1_radial_720_6454)"
        style={{
          mixBlendMode: "overlay",
        }}
      />
      <circle cx={8.33398} cy={7.5} r={7.25} stroke="#57565F" strokeWidth={0.5} />
      <circle
        cx={8.33398}
        cy={7.5}
        r={2.75}
        fill="white"
        stroke="#57565F"
        strokeWidth={0.5}
      />
      <defs>
        <linearGradient
          id="paint0_linear_720_6454"
          x1={60.534}
          y1={9.9}
          x2={11.2743}
          y2={41.8703}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.0550006} stopColor="#1F1F21" />
          <stop offset={0.340512} stopColor="#3E3D4C" />
          <stop offset={0.509437} stopColor="#1F1F21" />
          <stop offset={0.722531} stopColor="#3E3D4C" />
          <stop offset={1} stopColor="#1F1F21" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_720_6454"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(8.68943 1) rotate(90) scale(13 8.11058)"
        >
          <stop stopColor="#EDEFFF" />
          <stop offset={1} stopColor="#EDEFFF" stopOpacity={0} />
        </radialGradient>
      </defs>
    </svg>
  );
}

function MutedEllipse(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g opacity={0.5}>
        <circle cx={7.5} cy={7.5} r={7.25} fill="#121212" />
        <circle
          cx={7.5}
          cy={7.5}
          r={7.25}
          fill="url(#paint0_linear_720_6441)"
          fillOpacity={0.77}
        />
        <circle
          cx={7.5}
          cy={7.5}
          r={7.25}
          fill="url(#paint1_radial_720_6441)"
          style={{
            mixBlendMode: "overlay",
          }}
        />
        <circle cx={7.5} cy={7.5} r={7.25} stroke="#57565F" strokeWidth={0.5} />
        <circle
          cx={7.5}
          cy={7.5}
          r={2.75}
          fill="white"
          stroke="#57565F"
          strokeWidth={0.5}
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_720_6441"
          x1={59.7}
          y1={9.9}
          x2={10.4403}
          y2={41.8703}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.0550006} stopColor="#1F1F21" />
          <stop offset={0.340512} stopColor="#3E3D4C" />
          <stop offset={0.509437} stopColor="#1F1F21" />
          <stop offset={0.722531} stopColor="#3E3D4C" />
          <stop offset={1} stopColor="#1F1F21" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_720_6441"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(7.85545 1) rotate(90) scale(13 8.11058)"
        >
          <stop stopColor="#EDEFFF" />
          <stop offset={1} stopColor="#EDEFFF" stopOpacity={0} />
        </radialGradient>
      </defs>
    </svg>
  );
}

function GradientLine(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height={3}
      viewBox="0 0 208 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      preserveAspectRatio="none"
      {...props}
    >
      <path
        d="M0.5 1.50008L207.5 1.49994"
        stroke="url(#paint0_linear_720_6465)"
        strokeWidth={1.5}
      />
      <defs>
        <linearGradient
          id="paint0_linear_720_6465"
          x1={0.5}
          y1={1.99994}
          x2={180.666}
          y2={1.99995}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#666666" stopOpacity={0} />
          <stop offset={1} />
        </linearGradient>
      </defs>
    </svg>
  )
}

function DottedLine(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height={3}
      viewBox="0 0 387 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      preserveAspectRatio="none"
      {...props}
    >
      <path
        d="M1 2.00137L386 1.00003"
        stroke="url(#paint0_linear_720_6476)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeDasharray="5 4"
      />
      <defs>
        <linearGradient
          id="paint0_linear_720_6476"
          x1={182.435}
          y1={16102.7}
          x2={385.999}
          y2={16102.7}
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset={1} stopColor="#666666" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  )
}