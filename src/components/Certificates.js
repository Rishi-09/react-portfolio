import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CERTIFICATES } from '../constants';
import { InfiniteMovingCards } from './InfiniteMovingCards';
export const Certificates = () => {
    return (_jsxs("div", { className: "w-full py-20 overflow-hidden", children: [_jsx("div", { className: "max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-24 mb-16", children: _jsxs("div", { className: "reveal-child", children: [_jsx("h2", { className: "text-[10px] font-bold text-[#6D7CFF] uppercase tracking-[0.5em] mb-4", children: "Credentials" }), _jsx("p", { className: "text-4xl md:text-6xl font-semibold text-[#F0F2F5] tracking-tighter", children: "Certifications" })] }) }), _jsx("div", { className: "reveal-child", children: _jsx(InfiniteMovingCards, { items: CERTIFICATES, direction: "right", speed: "slow", className: "w-full" }) })] }));
};
