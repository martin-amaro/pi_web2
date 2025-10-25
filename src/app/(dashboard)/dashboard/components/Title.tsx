import React from 'react'

export default function Title({msg}: {msg: React.ReactNode}) {
  return <h1 className="text-lg font-semibold text-gray-800 mt-6 mb-3">{msg}</h1>;
}
