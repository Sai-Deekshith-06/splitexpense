import React from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QR({ payload }) {
  return (
    <QRCodeCanvas
      value={payload}
      size={256}
    />
  );
}