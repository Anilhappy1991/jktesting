import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data = [
  {
    name: "Ms. Mandeep Kaur IAS",
    designation: "Commissioner/ Secretary",
    jammu: "2542765, 2571609",
    srinagar: "2506060 ,2506024",
    email: ["hudd-jk@nic.in", "principalsecretaryhuddjk@gmail.com"],
  },
  {
    name: "Chanderkala, JKAS",
    designation: "Director (Finance)",
    jammu: "2561719",
    srinagar: "2506162",
    email: ["fahousing@gmail.com"],
  },
  {
    name: "Vikas Sharma, JKAS",
    designation: "Special Secretary",
    jammu: "-",
    srinagar: "-",
    email: ["hudd-jk@nic.in"],
  },
  {
    name: "Pran Singh, JKAS",
    designation: "Special Secretary",
    jammu: "2577795",
    srinagar: "2506255",
    email: ["hudd-jk@nic.in"],
  },
  {
    name: "Shagun Sharma, JKAS",
    designation: "Special Secretary",
    jammu: "-",
    srinagar: "-",
    email: ["hudd-jk@nic.in"],
  },
  {
    name: "Yoginder Katoch",
    designation: "Jt. Director (Planning)",
    jammu: "2569126",
    srinagar: "2506047",
    email: ["dphudd2018@gmail.com"],
  },
  {
    name: "Mridhu Slathia, JKAS",
    designation: "Additional Secretary",
    jammu: "-",
    srinagar: "-",
    email: ["hudd-jk@nic.in"],
  },
  {
    name: "Pardeep Singh Thakur",
    designation: "Additional Secretary (Legal)",
    jammu: "2520615",
    srinagar: "-",
    email: ["slohudd@gmail.com"],
  },
  {
    name: "Dr. Yodh Raj",
    designation: "Deputy Director (P)",
    jammu: "-",
    srinagar: "-",
    email: ["dphudd2018@gmail.com"],
  },
  {
    name: "Er. Abdul Qyume, JKAS",
    designation: "Deputy Secretary",
    jammu: "-",
    srinagar: "-",
    email: ["hudd-jk@nic.in"],
  },
  {
    name: "Tarandeep Singh",
    designation: "Under Secretary",
    jammu: "-",
    srinagar: "-",
    email: ["-"],
  },
  {
    name: "Ridhima Sharma",
    designation: "Under Secretary",
    jammu: "-",
    srinagar: "-",
    email: ["-"],
  },
  {
    name: "Ashok Kumar",
    designation: "Private Secretary",
    jammu: "2542765, 2571609",
    srinagar: "2506060,2506024",
    email: ["principalsecretaryhuddjk@gmail.com"],
  },
]

export default function ContactUs() {
  return (
    <div className="px-10 pt-5 pb-20">
      <div className="overflow-hidden rounded-lg border">
        <Table>
          {/* Header */}
          <TableHeader>
            <TableRow className="bg-[#145a86] hover:bg-[#145a86]">
              <TableHead className="border-r text-center text-white">
                Name S/Shri
              </TableHead>
              <TableHead className="border-r text-center text-white">
                Designation
              </TableHead>
              <TableHead
                className="border-r text-center text-white"
                colSpan={2}
              >
                Contact No.
              </TableHead>
              <TableHead className="text-center text-white">Email</TableHead>
            </TableRow>

            {/* Sub Header */}
            <TableRow className="bg-[#145a86] hover:bg-[#145a86]">
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead className="border-r text-center text-white">
                Jammu
              </TableHead>
              <TableHead className="border-r text-center text-white">
                Srinagar
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index} className="bg-gray-100 even:bg-gray-200">
                <TableCell className="border-r">{item.name}</TableCell>
                <TableCell className="border-r">{item.designation}</TableCell>
                <TableCell className="border-r text-center">
                  {item.jammu}
                </TableCell>
                <TableCell className="border-r text-center">
                  {item.srinagar}
                </TableCell>
                <TableCell>
                  {item.email.map((mail, i) => (
                    <div key={i}>
                      <a
                        href={`mailto:${mail}`}
                        className="text-blue-600 hover:underline"
                      >
                        {mail}
                      </a>
                    </div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
