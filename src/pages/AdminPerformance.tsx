import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, AlertTriangle, CheckCircle, TrendingDown, TrendingUp, RefreshCw } from "lucide-react";
import { format } from "date-fns";

const AdminPerformance = () => {
  const [refreshing, setRefreshing] = useState(false);

  // Fetch latest metrics
  const { data: latestMetrics, refetch: refetchMetrics } = useQuery({
    queryKey: ['latest-performance-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('performance_metrics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch metrics history
  const { data: metricsHistory } = useQuery({
    queryKey: ['performance-metrics-history'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('performance_metrics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(30);
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch active issues
  const { data: activeIssues } = useQuery({
    queryKey: ['performance-issues'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('performance_issues')
        .select('*, performance_metrics(created_at)')
        .eq('resolved', false)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch recent alerts
  const { data: recentAlerts } = useQuery({
    queryKey: ['performance-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('performance_alerts')
        .select('*, performance_metrics(created_at, performance_score)')
        .eq('resolved', false)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    }
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetchMetrics();
    setRefreshing(false);
  };

  const getScoreColor = (score?: number) => {
    if (!score) return "text-muted-foreground";
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score?: number) => {
    if (!score) return <Badge variant="secondary">N/A</Badge>;
    if (score >= 90) return <Badge className="bg-green-600">Excellent</Badge>;
    if (score >= 70) return <Badge className="bg-yellow-600">Good</Badge>;
    return <Badge variant="destructive">Needs Improvement</Badge>;
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-600">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const chartData = metricsHistory?.map(metric => ({
    date: format(new Date(metric.created_at), 'MMM dd HH:mm'),
    score: metric.performance_score || 0,
    lcp: metric.lcp ? (metric.lcp / 1000).toFixed(2) : 0,
    fcp: metric.fcp ? (metric.fcp / 1000).toFixed(2) : 0,
    cls: metric.cls ? (metric.cls * 100).toFixed(1) : 0,
  })).reverse();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Performance Monitor</h1>
            <p className="text-muted-foreground">Track and optimize site performance</p>
          </div>
          <Button onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Current Performance Score */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${getScoreColor(latestMetrics?.performance_score)}`}>
                {latestMetrics?.performance_score || 'N/A'}
              </div>
              <div className="mt-2">
                {getScoreBadge(latestMetrics?.performance_score)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">LCP</CardTitle>
              <CardDescription>Largest Contentful Paint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {latestMetrics?.lcp ? `${(latestMetrics.lcp / 1000).toFixed(2)}s` : 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">Target: &lt; 2.5s</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">FCP</CardTitle>
              <CardDescription>First Contentful Paint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {latestMetrics?.fcp ? `${(latestMetrics.fcp / 1000).toFixed(2)}s` : 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">Target: &lt; 1.8s</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">CLS</CardTitle>
              <CardDescription>Cumulative Layout Shift</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {latestMetrics?.cls ? latestMetrics.cls.toFixed(3) : 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">Target: &lt; 0.1</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {recentAlerts && recentAlerts.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <div className="font-semibold mb-2">Active Performance Alerts</div>
              <ul className="space-y-1">
                {recentAlerts.map((alert: any) => (
                  <li key={alert.id} className="text-sm">
                    {alert.message} - {format(new Date(alert.created_at), 'MMM dd, HH:mm')}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="trends" className="w-full">
          <TabsList>
            <TabsTrigger value="trends">Performance Trends</TabsTrigger>
            <TabsTrigger value="issues">Active Issues</TabsTrigger>
            <TabsTrigger value="details">Latest Details</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Score Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#8884d8" name="Score" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Core Web Vitals</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="lcp" stroke="#82ca9d" name="LCP (s)" />
                    <Line type="monotone" dataKey="fcp" stroke="#ffc658" name="FCP (s)" />
                    <Line type="monotone" dataKey="cls" stroke="#ff7c7c" name="CLS (x100)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Performance Issues</CardTitle>
                <CardDescription>Issues that need attention</CardDescription>
              </CardHeader>
              <CardContent>
                {activeIssues && activeIssues.length > 0 ? (
                  <div className="space-y-4">
                    {activeIssues.map((issue: any) => (
                      <div key={issue.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-yellow-600" />
                            <span className="font-semibold capitalize">{issue.issue_type}</span>
                          </div>
                          {getSeverityBadge(issue.severity)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                        <p className="text-sm font-medium">Recommendation:</p>
                        <p className="text-sm text-muted-foreground">{issue.recommendation}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>No active performance issues detected</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Latest Performance Details</CardTitle>
                <CardDescription>
                  Last updated: {latestMetrics?.created_at ? format(new Date(latestMetrics.created_at), 'PPpp') : 'N/A'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-2">Page Metrics</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Load Time:</span>
                        <span className="font-medium">
                          {latestMetrics?.load_time ? `${(latestMetrics.load_time / 1000).toFixed(2)}s` : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Page Size:</span>
                        <span className="font-medium">
                          {latestMetrics?.page_size ? `${(latestMetrics.page_size / 1000000).toFixed(2)}MB` : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Requests:</span>
                        <span className="font-medium">{latestMetrics?.requests_count || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Core Web Vitals</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">LCP:</span>
                        <span className="font-medium">
                          {latestMetrics?.lcp ? `${(latestMetrics.lcp / 1000).toFixed(2)}s` : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">FCP:</span>
                        <span className="font-medium">
                          {latestMetrics?.fcp ? `${(latestMetrics.fcp / 1000).toFixed(2)}s` : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">CLS:</span>
                        <span className="font-medium">
                          {latestMetrics?.cls ? latestMetrics.cls.toFixed(3) : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">TBT:</span>
                        <span className="font-medium">
                          {latestMetrics?.tbt ? `${latestMetrics.tbt.toFixed(0)}ms` : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminPerformance;
