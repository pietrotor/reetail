import React, { useRef, useState, useEffect } from "react";

import { Button } from "../ui";

import { cn } from "@/lib/utils";

interface Coordinates {
  x: number;
  y: number;
}

interface SignaturePadProps {
  onSave: (signatureData: string) => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // referencia al div contenedor

  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configure canvas
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Clear canvas
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      // Establecer tamaño real del canvas igual al tamaño visible del contenedor
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ): Coordinates => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      // Touch event
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    } else {
      // Mouse event
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (isConfirmed) return;

    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCoordinates(e);

    setIsDrawing(true);
    setIsEmpty(false);

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (isConfirmed) return;

    e.preventDefault();
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCoordinates(e);

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (isConfirmed) return;

    e.preventDefault();
    setIsDrawing(false);
  };

  const clearSignature = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
  };

  const confirmSignature = (): void => {
    if (isEmpty) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL("image/png");
    setIsConfirmed(true);
    onSave(dataURL);
  };

  const resetSignature = (): void => {
    setIsConfirmed(false);
    clearSignature();
    setIsEmpty(true);
  };

  return (
    <div>
      <div
        ref={containerRef}
        className={cn(
          "relative border-2 border-gray-300 rounded-lg bg-white shadow-lg w-full overflow-hidden h-96",
          isConfirmed && "pointer-events-none bg-amber-300"
        )}
      >
        <canvas
          ref={canvasRef}
          className={`${
            isConfirmed ? "cursor-default bg-amber-300" : "cursor-crosshair"
          } touch-none`}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        {isEmpty && !isConfirmed && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-gray-400 text-lg">Sign here</p>
          </div>
        )}

        {isConfirmed && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none"></div>
        )}
      </div>
      {isConfirmed ? (
        <Button
          variant={"secondary"}
          disabled={isEmpty}
          className="flex items-center cursor-pointer w-full mt-2"
          onClick={resetSignature}
        >
          Reset
        </Button>
      ) : (
        <div className="w-full grid grid-cols-2 gap-3 mt-2">
          <Button
            variant={"secondary"}
            className="flex items-center cursor-pointer"
            onClick={clearSignature}
            disabled={isEmpty}
          >
            Clear
          </Button>
          <Button
            variant={"default"}
            disabled={isEmpty}
            className="flex items-center cursor-pointer"
            onClick={confirmSignature}
          >
            Confirm
          </Button>
        </div>
      )}
    </div>
  );
};

export { SignaturePad };
