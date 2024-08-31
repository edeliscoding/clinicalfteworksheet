"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const ClinicalWorkTable = () => {
  const [billableItems, setBillableItems] = useState([
    { id: "outpatient", multiplier: 0, cFTEValue: 0.0022, total: 0 },
    { id: "synchronous", multiplier: 0, cFTEValue: 0.0022, total: 0 },
    { id: "asynchronous", multiplier: 0, cFTEValue: 0.0022, total: 0 },
    { id: "eConsult", multiplier: 0, cFTEValue: 0.0022, total: 0 },
  ]);

  const [nonBillableItems, setNonBillableItems] = useState([
    { id: "outpatientFollowUp", multiplier: 0, cFTEValue: 0.001, total: 0 },
    { id: "sectionClinicalService", multiplier: 0, cFTEValue: 0.005, total: 0 },
    { id: "reqClinicalMeetings", multiplier: 0, cFTEValue: 0.0005, total: 0 },
    { id: "supervising", multiplier: 0, cFTEValue: 0.003, total: 0 },
  ]);

  const [totalBillableCFTE, setTotalBillableCFTE] = useState(0);
  const [totalNonBillableCFTE, setTotalNonBillableCFTE] = useState(0);
  const [totalOutpatientCFTE, setTotalOutpatientCFTE] = useState(0);
  const handleMultiplierChange = (id, value) => {
    setBillableItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, multiplier: value, total: value * item.cFTEValue }
          : item
      )
    );
  };

  const handleMultiplierChangeoNonBillable = (id, value) => {
    setNonBillableItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, multiplier: value, total: value * item.cFTEValue }
          : item
      )
    );
  };

  useEffect(() => {
    const newTotalbillable = billableItems.reduce(
      (sum, item) => sum + item.total,
      0
    );
    const newTotalNonbillable = nonBillableItems.reduce(
      (sum, item) => sum + item.total,
      0
    );
    const newTotal = newTotalbillable + newTotalNonbillable;
    setTotalOutpatientCFTE(newTotal);
  }, [billableItems, nonBillableItems]);

  useEffect(() => {
    const newTotal = billableItems.reduce((sum, item) => sum + item.total, 0);
    setTotalBillableCFTE(newTotal);
  }, [billableItems]);

  useEffect(() => {
    const newTotal = nonBillableItems.reduce(
      (sum, item) => sum + item.total,
      0
    );
    setTotalNonBillableCFTE(newTotal);
  }, [nonBillableItems]);

  return (
    <div className="w-full max-w-7xl container p-4">
      <div className="text-center mb-4 font-bold underline text-2xl">
        Doe, John Smith
      </div>
      <Table>
        {/* <TableCaption>ATWOOD,ALEXANDRA CARRICK</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Clinical Work Description</TableHead>
            <TableHead>Parameters</TableHead>
            <TableHead>Multiplier Definition</TableHead>
            <TableHead>Multiplier (Numeric Only)</TableHead>
            <TableHead>cFTE Value</TableHead>
            <TableHead>Total cFTE (Multiplier x Rate)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={6} className="font-bold text-center">
              BILLABLE cFTE UNITS
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Outpatient Face-to-Face Clinic Sessions
              <br />
              <span className="text-sm">(New and Return Patients)</span>
            </TableCell>
            <TableCell>
              4-hour session
              <br />
              12 wRVU*
              <br />
              ~3-4 NPV/-6-8 RPV
            </TableCell>
            <TableCell>
              Number of total sessions per academic year
              <br />
              45 sessions per year x # of planned half-day sessions per week
            </TableCell>
            <TableCell>
              {/* <Input type="number" /> */}
              <Input
                type="number"
                value={billableItems[0].multiplier}
                onChange={(e) =>
                  handleMultiplierChange("outpatient", Number(e.target.value))
                }
              />
            </TableCell>
            {/* <TableCell>0.0022</TableCell>
            <TableCell></TableCell> */}
            <TableCell>{billableItems[0].cFTEValue}</TableCell>
            <TableCell>{billableItems[0].total.toFixed(4)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Synchronous Procedure Session
              <br />
              <span className="text-sm">
                (Procedures performed with patient present on templated clinic
                time: EMG/NCS, Biopsy, LP, Injections, device programming)
              </span>
            </TableCell>
            <TableCell>
              4-hour session
              <br />
              12 wRVU*
              <br />
              ~3 EMG/NCS; ~6 LPs; ~8 injections; ~8 30-min DBS programming
            </TableCell>
            <TableCell>
              Number of total sessions per academic year
              <br />
              45 sessions per year x # of planned half-day sessions per week
            </TableCell>
            <TableCell>
              {/* <Input type="number" /> */}
              <Input
                type="number"
                value={billableItems[1].multiplier}
                onChange={(e) =>
                  handleMultiplierChange("synchronous", Number(e.target.value))
                }
              />
            </TableCell>
            {/* <TableCell>0.0022</TableCell>
            <TableCell></TableCell> */}
            <TableCell>{billableItems[1].cFTEValue}</TableCell>
            <TableCell>{billableItems[1].total.toFixed(4)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Asynchronous Procedure Session
              <br />
              <span className="text-sm">
                (Procedure performed without patient present and/or without
                templated clinic time: Study/test interpretation, inpatient
                test)
              </span>
            </TableCell>
            <TableCell>
              Equivalent of 4-hour session
              <br />
              12 wRVU*
              <br />
              1 intraoperative monitoring session
              <br />
              ~5-6 PSG or vEEG interpretations
            </TableCell>
            <TableCell>Number of total sessions per academic year</TableCell>
            <TableCell>
              {/* <Input type="number" /> */}
              <Input
                type="number"
                value={billableItems[2].multiplier}
                onChange={(e) =>
                  handleMultiplierChange("asynchronous", Number(e.target.value))
                }
              />
            </TableCell>
            {/* <TableCell>0.0022</TableCell>
            <TableCell></TableCell> */}
            <TableCell>{billableItems[2].cFTEValue}</TableCell>
            <TableCell>{billableItems[2].total.toFixed(4)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>eConsult Session</TableCell>
            <TableCell>
              Equivalent of 4-hour session
              <br />
              12 wRVU*
              <br />
              ~17 eConsults
            </TableCell>
            <TableCell>Number of total sessions per academic year</TableCell>
            <TableCell>
              {/* <Input type="number" /> */}
              <Input
                type="number"
                value={billableItems[3].multiplier}
                onChange={(e) =>
                  handleMultiplierChange("eConsult", Number(e.target.value))
                }
              />
            </TableCell>
            {/* <TableCell>0.0022</TableCell>
            <TableCell></TableCell> */}
            <TableCell>{billableItems[3].cFTEValue}</TableCell>
            <TableCell>{billableItems[3].total.toFixed(4)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="text-right font-bold">
              Total Billable cFTE
            </TableCell>
            <TableCell>
              {/* <Input type="number" /> */}
              <Input
                type="number"
                value={totalBillableCFTE.toFixed(4)}
                readOnly
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={6} className="font-bold text-center">
              NON-BILLABLE cFTE UNITS
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Outpatient Non-Face-to-Face Clinic Follow-Up Care
              <br />
              <span className="text-sm">
                (Following up results, speaking to family, phone calls/MHC
                messages associated with Outpatient F2F Clinic Sessions)
              </span>
            </TableCell>
            <TableCell>
              2-hour session for each Outpatient F2F Clinic 4-hour session
            </TableCell>
            <TableCell>Number of sessions per academic year</TableCell>
            <TableCell>
              {/* <Input type="number" /> */}
              <Input
                type="number"
                value={nonBillableItems[0].multiplier}
                onChange={(e) =>
                  handleMultiplierChangeoNonBillable(
                    "outpatientFollowUp",
                    Number(e.target.value)
                  )
                }
              />
            </TableCell>
            {/* <TableCell>0.001</TableCell>
            <TableCell></TableCell> */}
            <TableCell>{nonBillableItems[0].cFTEValue}</TableCell>
            <TableCell>{nonBillableItems[0].total.toFixed(4)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Section Clinical Service
              <br />
              <span className="text-sm">
                (Section DocLine, covering section members out of office,
                Internal Curbsides, Section &quot;Doc of Week&quot;)
              </span>
            </TableCell>
            <TableCell>One week (M-F, 7a-8p)</TableCell>
            <TableCell>Number of weeks per academic year</TableCell>
            <TableCell>
              {/* <Input type="number" /> */}
              <Input
                type="number"
                value={nonBillableItems[1].multiplier}
                onChange={(e) =>
                  handleMultiplierChangeoNonBillable(
                    "sectionClinicalService",
                    Number(e.target.value)
                  )
                }
              />
            </TableCell>
            <TableCell>{nonBillableItems[1].cFTEValue}</TableCell>
            <TableCell>{nonBillableItems[1].total.toFixed(4)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Required Clinical Meetings for Patient Care
              <br />
              <span className="text-sm">
                (Tumor Board, Consensus Conferences, Surgical Review)
              </span>
            </TableCell>
            <TableCell>1-hour meeting session</TableCell>
            <TableCell>Number of sessions per academic year</TableCell>
            <TableCell>
              {/* <Input type="number" /> */}
              <Input
                type="number"
                value={nonBillableItems[2].multiplier}
                onChange={(e) =>
                  handleMultiplierChangeoNonBillable(
                    "reqClinicalMeetings",
                    Number(e.target.value)
                  )
                }
              />
            </TableCell>
            {/* <TableCell>0.0005</TableCell>
            <TableCell></TableCell> */}
            <TableCell>{nonBillableItems[2].cFTEValue}</TableCell>
            <TableCell>{nonBillableItems[2].total.toFixed(4)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Supervising Trainee/APP Clinics</TableCell>
            <TableCell>
              4-hour F2F + 2-hour follow-up care/ patient support
            </TableCell>
            <TableCell>Number of sessions per academic year</TableCell>
            <TableCell>
              {/* <Input type="number" /> */}
              <Input
                type="number"
                value={nonBillableItems[3].multiplier}
                onChange={(e) =>
                  handleMultiplierChangeoNonBillable(
                    "supervising",
                    Number(e.target.value)
                  )
                }
              />
            </TableCell>
            {/* <TableCell>0.003</TableCell>
            <TableCell></TableCell> */}
            <TableCell>{nonBillableItems[3].cFTEValue}</TableCell>
            <TableCell>{nonBillableItems[3].total.toFixed(4)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="text-right font-bold">
              Total Non-Billable cFTE
            </TableCell>
            <TableCell>
              {/* <Input type="number" /> */}
              {/* <Input
                type="number"
                value={totalBillableCFTE.toFixed(4)}
                readOnly
              /> */}
              <Input
                type="number"
                value={totalNonBillableCFTE.toFixed(4)}
                readOnly
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="text-right font-bold">
              Total Outpatient Clinical FTE
            </TableCell>
            <TableCell>
              {/* <Input type="number" /> */}
              <Input
                type="number"
                value={totalOutpatientCFTE.toFixed(4)}
                readOnly
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="text-right font-bold">
              Total Research FTE
            </TableCell>
            <TableCell>
              <Input type="number" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="text-right font-bold">
              Total Admin FTE
            </TableCell>
            <TableCell>
              <Input type="number" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="text-right font-bold">
              TOTAL FACULTY FTE
            </TableCell>
            <TableCell>
              <Input type="number" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ClinicalWorkTable;
