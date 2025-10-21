import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PerformanceMetrics {
  lcp?: number;
  fcp?: number;
  cls?: number;
  tbt?: number;
  speed_index?: number;
  performance_score?: number;
  accessibility_score?: number;
  best_practices_score?: number;
  seo_score?: number;
  page_size?: number;
  load_time?: number;
  requests_count?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { metrics, url, issues } = await req.json();

    console.log('Received performance metrics:', { url, metrics });

    // Store metrics in database
    const { data: metricData, error: metricError } = await supabase
      .from('performance_metrics')
      .insert({
        url: url || 'https://ebethboutique.com',
        lcp: metrics?.lcp,
        fcp: metrics?.fcp,
        cls: metrics?.cls,
        tbt: metrics?.tbt,
        speed_index: metrics?.speed_index,
        performance_score: metrics?.performance_score,
        accessibility_score: metrics?.accessibility_score,
        best_practices_score: metrics?.best_practices_score,
        seo_score: metrics?.seo_score,
        page_size: metrics?.page_size,
        load_time: metrics?.load_time,
        requests_count: metrics?.requests_count,
      })
      .select()
      .single();

    if (metricError) {
      console.error('Error storing metrics:', metricError);
      throw metricError;
    }

    // Store any issues detected
    if (issues && Array.isArray(issues) && issues.length > 0) {
      const issueRecords = issues.map((issue: any) => ({
        metric_id: metricData.id,
        issue_type: issue.type || 'unknown',
        severity: issue.severity || 'medium',
        description: issue.description,
        recommendation: issue.recommendation,
      }));

      const { error: issuesError } = await supabase
        .from('performance_issues')
        .insert(issueRecords);

      if (issuesError) {
        console.error('Error storing issues:', issuesError);
      }
    }

    // Check if performance score is below threshold (70)
    if (metrics?.performance_score && metrics.performance_score < 70) {
      console.log('Performance score below threshold, creating alert');
      
      await supabase
        .from('performance_alerts')
        .insert({
          metric_id: metricData.id,
          alert_type: 'performance_degradation',
          message: `Performance score dropped to ${metrics.performance_score}`,
          severity: metrics.performance_score < 50 ? 'high' : 'medium',
        });
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        metric_id: metricData.id,
        message: 'Performance metrics stored successfully' 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in performance-monitor:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});