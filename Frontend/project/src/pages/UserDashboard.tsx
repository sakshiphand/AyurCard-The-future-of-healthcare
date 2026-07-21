import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Card from "../components/Card";

import {
  Activity,
  Brain,
  Stethoscope,
  Database,
  CheckCircle,
  AlertCircle,
  Users,
  FileText,
  Code,
  Layers,
  TrendingUp,
  Shield,
  ChevronRight
} from "lucide-react";

export default function UserDashboard() {

  const stats = [
    { label: "Total Diseases", value: "350+", icon: FileText, color: "bg-blue-500" },
    { label: "Total Symptoms", value: "1,200+", icon: Activity, color: "bg-green-500" },
    { label: "Total Doctors", value: "500+", icon: Users, color: "bg-purple-500" },
    { label: "Dataset Size", value: "50,000+", icon: Database, color: "bg-orange-500" }
  ];

  const techStack = [
    { name: "React + Tailwind CSS", icon: Code, category: "Frontend" },
    { name: "FastAPI (Python)", icon: Layers, category: "Backend" },
    { name: "Pandas", icon: Database, category: "Data Processing" },
    { name: "Axios", icon: TrendingUp, category: "API Communication" },
    { name: "CSV Medical Records", icon: FileText, category: "Dataset" }
  ];

  const features = [
    { title: "Symptom-based Disease Prediction", icon: Activity },
    { title: "Acute & Chronic Classification", icon: AlertCircle },
    { title: "Doctor Recommendation System", icon: Users },
    { title: "Confidence Percentage", icon: TrendingUp },
    { title: "Disease Description", icon: FileText },
    { title: "Medical Advice", icon: Shield }
  ];

  const workflowSteps = [
    { step: 1, title: "Select Symptoms", description: "User selects symptoms from dropdown" },
    { step: 2, title: "AI Analysis", description: "AI analyzes symptoms using similarity matching" },
    { step: 3, title: "Disease Prediction", description: "System predicts most probable disease" },
    { step: 4, title: "Classification", description: "Disease classified as Acute or Chronic" },
    { step: 5, title: "Recommendations", description: "Doctor recommendations and advice shown" }
  ];

  return (

    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">

        {/* ---------- Header ---------- */}

        <div className="text-center py-6">

          <div className="flex justify-center mb-4">
            <Brain className="w-12 h-12 text-blue-600" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900">
            AI Health Insight System
          </h1>

          <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
            AI-powered system that analyzes patient symptoms and predicts diseases
            using symptom similarity matching algorithm. The system also classifies
            diseases into Acute or Chronic and recommends doctors.
          </p>

        </div>


        {/* ---------- Statistics ---------- */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((stat, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition border"
            >

              <div
                className={`w-12 h-12 flex items-center justify-center text-white rounded-lg mb-4 ${stat.color}`}
              >
                <stat.icon className="w-6 h-6" />
              </div>

              <p className="text-3xl font-bold">{stat.value}</p>

              <p className="text-gray-600 text-sm">{stat.label}</p>

            </div>

          ))}

        </div>


        {/* ---------- Workflow ---------- */}

        <Card title="How the System Works" icon={CheckCircle}>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

            {workflowSteps.map((item, index) => (

              <div key={index} className="relative">

                <div className="bg-blue-50 rounded-xl p-6 h-full">

                  <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold mb-3">
                    {item.step}
                  </div>

                  <h3 className="font-semibold mb-1">{item.title}</h3>

                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>

                </div>

                {index < workflowSteps.length - 1 && (

                  <ChevronRight className="hidden lg:block absolute top-1/2 -right-5 text-blue-300" />

                )}

              </div>

            ))}

          </div>

        </Card>


        {/* ---------- AI Model + Features ---------- */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <Card title="AI Model Information" icon={Brain}>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span>Model Name</span>
                <span className="font-semibold">AI Health Insight Model</span>
              </div>

              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span>Algorithm</span>
                <span className="font-semibold">Symptom Similarity Matching</span>
              </div>

              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span>Dataset</span>
                <span className="font-semibold">Medical Records Dataset</span>
              </div>

              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span>Features Used</span>
                <span className="font-semibold">Symptoms</span>
              </div>

              <div className="flex justify-between p-3 bg-blue-50 border border-blue-200 rounded">
                <span className="text-blue-700">Target</span>
                <span className="font-semibold text-blue-900">
                  Disease Prediction & Type
                </span>
              </div>

            </div>

          </Card>


          <Card title="System Features" icon={Stethoscope}>

            <div className="grid gap-3">

              {features.map((feature, index) => (

                <div
                  key={index}
                  className="flex items-center gap-4 p-3 bg-green-50 rounded"
                >

                  <feature.icon className="w-5 h-5 text-blue-600" />

                  <span className="text-gray-800 font-medium">
                    {feature.title}
                  </span>

                </div>

              ))}

            </div>

          </Card>

        </div>


        {/* ---------- Technology Stack ---------- */}

        <Card title="Technology Stack" icon={Code}>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

            {techStack.map((tech, index) => (

              <div
                key={index}
                className="bg-gray-50 rounded-xl p-5 text-center"
              >

                <div className="flex justify-center mb-3">
                  <tech.icon className="w-6 h-6 text-blue-600" />
                </div>

                <p className="text-xs text-blue-600 font-semibold uppercase mb-1">
                  {tech.category}
                </p>

                <p className="text-sm font-semibold text-gray-900">
                  {tech.name}
                </p>

              </div>

            ))}

          </div>

        </Card>


        {/* ---------- Footer ---------- */}

        <footer className="text-center pt-6">

          <p className="text-gray-500 text-sm">
            Professional Healthcare Analytics System • Powered by AI
          </p>

        </footer>

      </main>

    </div>

  );
}