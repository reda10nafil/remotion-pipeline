import React from "react";
import { tokens } from "../tokens";
import { interpolate, useCurrentFrame } from "remotion";

export interface ChatMessage {
  sender: "user" | "coordinatore" | "agent";
  agentName?: string;
  avatarColor?: string;
  text: string;
  delayFrame: number;
}

interface ChatSimulationProps {
  messages: ChatMessage[];
  width?: number | string;
}

export const ChatSimulation: React.FC<ChatSimulationProps> = ({
  messages,
  width = "100%",
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width,
        backgroundColor: tokens.colors.bgElevated,
        borderRadius: 14,
        border: `1px solid ${tokens.colors.border}`,
        boxShadow: "0 15px 35px -10px rgba(0, 0, 0, 0.5)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          padding: "12px 18px",
          borderBottom: `1px solid ${tokens.colors.border}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: "#151826",
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: tokens.colors.accentGreen }} />
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: tokens.colors.textPrimary,
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          Antigravity Chat — Pipeline Orchestration
        </span>
      </div>

      {/* Message List */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
        {messages.map((msg, index) => {
          const entrance = interpolate(frame, [msg.delayFrame, msg.delayFrame + 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const translateY = interpolate(frame, [msg.delayFrame, msg.delayFrame + 12], [15, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          if (entrance === 0) return null;

          const isUser = msg.sender === "user";

          return (
            <div
              key={index}
              style={{
                opacity: entrance,
                transform: `translateY(${translateY}px)`,
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
                gap: 10,
              }}
            >
              {!isUser && (
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    backgroundColor: msg.avatarColor || tokens.colors.brand,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 12,
                    fontFamily: tokens.typography.fontMono,
                    flexShrink: 0,
                  }}
                >
                  {msg.agentName ? msg.agentName.substring(0, 2).toUpperCase() : "AI"}
                </div>
              )}

              <div
                style={{
                  maxWidth: "80%",
                  backgroundColor: isUser ? tokens.colors.brand : tokens.colors.bgCard,
                  border: `1px solid ${isUser ? tokens.colors.brandLight : tokens.colors.border}`,
                  padding: "12px 16px",
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                {!isUser && msg.agentName && (
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: msg.avatarColor || tokens.colors.brandLight,
                      marginBottom: 4,
                      fontFamily: tokens.typography.fontMono,
                    }}
                  >
                    {msg.agentName}
                  </div>
                )}
                <div
                  style={{
                    fontSize: 14,
                    color: tokens.colors.textPrimary,
                    lineHeight: 1.5,
                    fontFamily: tokens.typography.fontFamily,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
