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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ConstructTeam INC
                </h1>
              </div>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Professional construction estimates made simple. Create detailed estimates, 
              track your projects, and grow your business with our powerful estimation tools.
            </p>
            <Badge variant="secondary" className="mt-4 bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm">
              Professional Estimation Platform
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* Create New */}
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-secondary/20 hover:scale-105">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">Create New Estimate</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Start fresh with a new construction estimate. Our step-by-step wizard 
                makes it easy to create professional estimates in minutes.
              </p>
              <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Professional templates</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Client management</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Quick service library</span>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/create')}
                className="w-full shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                Get Started
                <Plus className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Recent Estimates */}
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-secondary/20 hover:scale-105">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">Recent Estimates</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Access your previously created estimates. Review, duplicate, or 
                continue working on your saved projects.
              </p>
              <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>Quick access to history</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>Duplicate estimates</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>Client history</span>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/recent')}
                variant="outline"
                className="w-full shadow-lg hover:shadow-xl transition-all duration-300 border-accent/30 hover:border-accent"
                size="lg"
              >
                View Recent
                <Clock className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-primary/10">
              <div className="text-xl sm:text-2xl font-bold text-primary mb-1">Fast</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Create estimates in minutes</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-accent/10">
              <div className="text-xl sm:text-2xl font-bold text-accent mb-1">Professional</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Impress your clients</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-primary/10">
              <div className="text-xl sm:text-2xl font-bold text-primary mb-1">Organized</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Keep track of everything</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};