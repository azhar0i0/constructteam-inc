import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, Sparkles, FileText, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/5">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ConstructTeam INC
                </h1>
              </div>
            </div>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-muted-foreground max-w-4xl mx-auto px-2 sm:px-4">
              Professional construction estimates made simple. Create detailed estimates, 
              track your projects, and grow your business with our powerful estimation tools.
            </p>
            <Badge variant="secondary" className="mt-2 sm:mt-3 lg:mt-4 bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm lg:text-base px-2 sm:px-3 py-1">
              Professional Estimation Platform
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-12 max-w-6xl mx-auto">
          {/* Create New */}
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-secondary/20 hover:scale-105 animate-in fade-in slide-in-from-left-4 duration-700">
            <CardContent className="p-4 sm:p-6 lg:p-8 xl:p-10 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 sm:mb-3 lg:mb-4">Create New Estimate</h2>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6 lg:mb-8 leading-relaxed px-2">
                Start fresh with a new construction estimate. Our step-by-step wizard 
                makes it easy to create professional estimates in minutes.
              </p>
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 lg:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base text-muted-foreground">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  <span>Professional templates</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base text-muted-foreground">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  <span>Client management</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base text-muted-foreground">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  <span>Quick service library</span>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/create')}
                className="w-full shadow-lg hover:shadow-xl transition-all duration-300 h-9 sm:h-10 lg:h-12 text-sm sm:text-base lg:text-lg"
                size="lg"
              >
                Get Started
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Recent Estimates */}
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-secondary/20 hover:scale-105 animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
            <CardContent className="p-4 sm:p-6 lg:p-8 xl:p-10 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 sm:mb-3 lg:mb-4">Recent Estimates</h2>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6 lg:mb-8 leading-relaxed px-2">
                Access your previously created estimates. Review, duplicate, or 
                continue working on your saved projects.
              </p>
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 lg:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base text-muted-foreground">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                  <span>Quick access to history</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base text-muted-foreground">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                  <span>Duplicate estimates</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base text-muted-foreground">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                  <span>Client history</span>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/recent')}
                variant="outline"
                className="w-full shadow-lg hover:shadow-xl transition-all duration-300 border-accent/30 hover:border-accent h-9 sm:h-10 lg:h-12 text-sm sm:text-base lg:text-lg"
                size="lg"
              >
                View Recent
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-8 sm:mt-12 lg:mt-16 xl:mt-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 xl:gap-8 max-w-4xl mx-auto">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-6 xl:p-8 border border-primary/10 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-primary mb-1">Fast</div>
              <div className="text-xs sm:text-sm lg:text-base text-muted-foreground">Create estimates in minutes</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-6 xl:p-8 border border-accent/10 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-accent mb-1">Professional</div>
              <div className="text-xs sm:text-sm lg:text-base text-muted-foreground">Impress your clients</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-6 xl:p-8 border border-primary/10 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-primary mb-1">Organized</div>
              <div className="text-xs sm:text-sm lg:text-base text-muted-foreground">Keep track of everything</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};