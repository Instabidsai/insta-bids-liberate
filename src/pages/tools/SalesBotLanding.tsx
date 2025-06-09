import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MessageSquare, Zap, Brain, DollarSign, Users, CheckCircle2, Sparkles, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function SalesBotLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Powered by AI & CopilotKit</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Your AI Sales Assistant
              <span className="block text-blue-200 mt-2">That Actually Closes Deals</span>
            </h1>
            
            <p className="max-w-3xl mx-auto text-xl text-blue-100">
              Stop losing leads in endless email chains. Our AI Sales Bot guides homeowners through your entire sales process - from initial interest to signed contract - in one seamless conversation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/tools/sales-bot">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 text-lg px-8 py-6">
                  Start Free Conversation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                Watch Demo (2 min)
              </Button>
            </div>
            
            <div className="pt-8 flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>5-minute setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated gradient orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full blur-3xl opacity-20 animate-pulse" />
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Sales Process is Broken
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Traditional sales methods are slow, inconsistent, and lose 67% of leads
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="text-red-600 mb-4">
                  <Clock className="w-10 h-10" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Slow Response Times</h3>
                <p className="text-gray-600">
                  Average response time: 48 hours. By then, your lead has already found another contractor.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="text-red-600 mb-4">
                  <MessageSquare className="w-10 h-10" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Inconsistent Messaging</h3>
                <p className="text-gray-600">
                  Every salesperson says something different. Your brand message gets lost.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="text-red-600 mb-4">
                  <Users className="w-10 h-10" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Manual Follow-ups</h3>
                <p className="text-gray-600">
                  Sales reps forget to follow up. Hot leads turn cold. Revenue walks away.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AI That Sells Like Your Best Rep
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our Sales Bot uses advanced AI to guide every lead through a proven 5-stage sales process
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Understanding</h3>
                  <p className="text-gray-600">
                    AI asks smart questions to understand exactly what the homeowner needs
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">MVP Identification</h3>
                  <p className="text-gray-600">
                    Identifies the core project requirements and suggests the best approach
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Scoping</h3>
                  <p className="text-gray-600">
                    Details the full project scope with timeline and material requirements
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Proposal</h3>
                  <p className="text-gray-600">
                    Generates a professional proposal with pricing and payment terms
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold">
                  5
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Closed</h3>
                  <p className="text-gray-600">
                    Collects contact info and schedules the project start
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <div className="space-y-4">
                    <div className="bg-blue-600 text-white p-3 rounded-lg max-w-[80%]">
                      <p className="text-sm">Hi! I'm looking to remodel my kitchen</p>
                    </div>
                    <div className="bg-gray-700 text-white p-3 rounded-lg max-w-[80%] ml-auto">
                      <p className="text-sm">Great! I'd love to help. What's your vision for the new kitchen?</p>
                    </div>
                    <div className="bg-blue-600 text-white p-3 rounded-lg max-w-[80%]">
                      <p className="text-sm">Modern style, open concept, around $25k budget</p>
                    </div>
                    <div className="bg-gray-700 text-white p-3 rounded-lg max-w-[80%] ml-auto">
                      <p className="text-sm">Perfect! Let me show you some options...</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                Live Demo →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Not Just Another Chatbot
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dynamic UI components that adapt to each conversation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-blue-600 mb-4">
                  <Brain className="w-10 h-10" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Generative UI</h3>
                <p className="text-gray-600">
                  AI generates interactive forms, sliders, and selection cards in real-time based on the conversation.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-blue-600 mb-4">
                  <Zap className="w-10 h-10" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Instant Response</h3>
                <p className="text-gray-600">
                  Responds in seconds, not hours. Never lose another lead to slow follow-up.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-blue-600 mb-4">
                  <DollarSign className="w-10 h-10" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Smart Pricing</h3>
                <p className="text-gray-600">
                  Automatically calculates accurate quotes based on your pricing rules and project scope.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real Results from Real Contractors
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our AI Sales Bot is transforming how contractors close deals
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">47%</div>
              <p className="text-blue-200">Higher conversion rate</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">3x</div>
              <p className="text-blue-200">Faster response time</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">$2.3M</div>
              <p className="text-blue-200">Additional revenue generated</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">92%</div>
              <p className="text-blue-200">Customer satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Sales Process?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of contractors using AI to close more deals
          </p>
          
          <Link to="/tools/sales-bot">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6">
              Start Your First AI Conversation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          <p className="mt-6 text-sm text-gray-500">
            Free to try • No credit card required • Setup in 5 minutes
          </p>
        </div>
      </section>
    </div>
  );
}